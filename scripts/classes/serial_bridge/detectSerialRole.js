import FrameParser from "./frameParser.js";

// Probe a freshly-connected port to decide whether it's running bridge/dongle firmware
// or plain tracker firmware. Bridges/dongles answer the SCInit command with an [SC] IDENT
// message; plain trackers do not. We probe at the bridge baud (921600) and strip the
// interleaved 0xA5 tracker frames so the [SC] line is visible. IDENT within the window
// means 'bridge'; a timeout means 'tracker'.
//
// The port is opened and closed entirely within this function, leaving it free for the
// chosen device's manager to reopen at its own baud.

const BRIDGE_BAUD = 921600;
// ESP8266 bridge firmware blocks ~5s in setup (WiFi init) before Serial.begin(), so a
// freshly powered/reset board is silent and cannot answer SCInit for that long. Since a
// booting dongle also emits boot text *before* its IDENT, "saw text" can't shortcut the
// tracker verdict — the window must outlast that boot delay. Bridges/dongles still
// resolve immediately when IDENT arrives; only genuine trackers wait the full timeout.
const PROBE_TIMEOUT_MS = 7000;
const SCINIT_INTERVAL_MS = 500;
const SC_PREFIX = [91, 83, 67, 93]; // "[SC]"
const IDENT = 0;                     // SerialComParser message type for the identity reply
const MAX_TEXT = 4096;               // cap the rolling scan buffer

// True if `text` contains the [SC] prefix immediately followed by the IDENT type byte.
function hasScIdent(text) {
    const end = text.length - (SC_PREFIX.length + 1);
    for (let i = 0; i <= end; i++) {
        if (text[i] === SC_PREFIX[0] && text[i + 1] === SC_PREFIX[1] &&
            text[i + 2] === SC_PREFIX[2] && text[i + 3] === SC_PREFIX[3] &&
            text[i + 4] === IDENT) {
            return true;
        }
    }
    return false;
}

/**
 * @param {SerialPort} port
 * @returns {Promise<'bridge'|'tracker'>}
 */
export default async function detectSerialRole(port) {
    await port.open({ baudRate: BRIDGE_BAUD });

    const parser = new FrameParser();
    const reader = port.readable.getReader();
    const writer = port.writable.getWriter();
    const encoder = new TextEncoder();
    let text = [];
    let sendTimer = null;
    let timeoutTimer = null;

    const sendInit = () => writer.write(encoder.encode("SCInit\n")).catch(() => {});

    const result = await new Promise((resolve) => {
        timeoutTimer = setTimeout(() => resolve('tracker'), PROBE_TIMEOUT_MS);
        sendTimer = setInterval(sendInit, SCINIT_INTERVAL_MS);
        sendInit(); // immediate first attempt

        (async () => {
            try {
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;
                    for (const seg of parser.feed(value)) {
                        if (seg.type !== 'text') continue;
                        for (let i = 0; i < seg.bytes.length; i++) text.push(seg.bytes[i]);
                    }
                    if (hasScIdent(text)) { resolve('bridge'); break; }
                    // Keep the tail so a prefix split across reads is still matchable.
                    if (text.length > MAX_TEXT) text = text.slice(-(SC_PREFIX.length + 1));
                }
            } catch {
                // reader.cancel() during cleanup rejects the pending read; ignore.
            }
        })();
    });

    clearInterval(sendTimer);
    clearTimeout(timeoutTimer);
    try { await reader.cancel(); } catch {}
    try { reader.releaseLock(); } catch {}
    try { writer.releaseLock(); } catch {}
    try { await port.close(); } catch {}

    return result;
}
