// Incremental parser for the binary tracker frames the bridge firmware interleaves
// with the [SC] management protocol and debug text on the serial stream.
//
// Wire framing (see SlimeVR-Receiver .../bridge/slimevr_serial_bridge.py FrameParser
// and firmware src/transport/SerialFrameSink.cpp):
//
//     0xA5 0x5A  <len:u8>  <payload[len]>  <crc8>
//     crc8 = CRC-8 (poly 0x07, init 0x00) over (len byte + payload)
//
// Each payload is one 64-byte HID transfer bound for the SlimeVR server. The manager
// app does not forward those (that is the Python bridge's job, and the two never hold
// the port at once), so callers discard 'frame' segments and keep only 'text'.

const MAGIC0 = 0xA5;
const MAGIC1 = 0x5A;
const MAX_PAYLOAD = 250;

// Precomputed CRC-8 table (poly 0x07, init 0x00) — must match the firmware/Python.
const CRC_TABLE = (() => {
    const table = new Uint8Array(256);
    for (let i = 0; i < 256; i++) {
        let crc = i;
        for (let b = 0; b < 8; b++) {
            crc = (crc & 0x80) ? ((crc << 1) ^ 0x07) & 0xFF : (crc << 1) & 0xFF;
        }
        table[i] = crc;
    }
    return table;
})();

function crc8(bytes) {
    let crc = 0x00;
    for (let i = 0; i < bytes.length; i++) crc = CRC_TABLE[crc ^ bytes[i]];
    return crc;
}

class FrameParser {
    /** @type {number[]} pending bytes not yet resolved to text/frame */
    buf = [];

    /**
     * Feed raw serial bytes; returns segments in stream order:
     *   { type: 'text',  bytes: number[] }  -> pass through to line handling
     *   { type: 'frame', bytes: number[] }  -> a CRC-validated tracker payload
     * Partial frames at the tail are retained until more bytes arrive.
     * @param {Iterable<number>} chunk
     * @returns {Array<{type: 'text'|'frame', bytes: number[]}>}
     */
    feed(chunk) {
        const out = [];
        for (const b of chunk) this.buf.push(b);
        while (true) {
            const idx = this.findMagic();
            if (idx === -1) {
                // No magic present. A trailing 0xA5 may be the start of a frame that
                // is split across reads, so keep it and emit everything before it.
                const keep = (this.buf.length && this.buf[this.buf.length - 1] === MAGIC0) ? 1 : 0;
                if (this.buf.length > keep) {
                    out.push({ type: 'text', bytes: this.buf.splice(0, this.buf.length - keep) });
                }
                return out;
            }
            // Anything before the magic is plain text.
            if (idx > 0) out.push({ type: 'text', bytes: this.buf.splice(0, idx) });
            // Need magic (2) + length (1) before we can size the frame.
            if (this.buf.length < 3) return out;
            const length = this.buf[2];
            if (length === 0 || length > MAX_PAYLOAD) {
                // Invalid length -> false-positive magic. Drop one byte and resync.
                out.push({ type: 'text', bytes: this.buf.splice(0, 1) });
                continue;
            }
            const frameLen = 3 + length + 1; // magic0, magic1, len, payload, crc
            if (this.buf.length < frameLen) return out; // wait for the rest
            const payload = this.buf.slice(3, 3 + length);
            const crc = this.buf[3 + length];
            // CRC over (len byte + payload).
            let c = CRC_TABLE[length];
            for (let i = 0; i < payload.length; i++) c = CRC_TABLE[c ^ payload[i]];
            if (c === crc) {
                out.push({ type: 'frame', bytes: payload });
                this.buf.splice(0, frameLen);
            } else {
                // Bad CRC -> false positive. Drop first magic byte and resync.
                out.push({ type: 'text', bytes: this.buf.splice(0, 1) });
            }
        }
    }

    /** Index of the first 0xA5 0x5A pair, or -1. */
    findMagic() {
        for (let i = 0; i + 1 < this.buf.length; i++) {
            if (this.buf[i] === MAGIC0 && this.buf[i + 1] === MAGIC1) return i;
        }
        return -1;
    }

    reset() {
        this.buf = [];
    }
}

export default FrameParser;
export { crc8, MAGIC0, MAGIC1, MAX_PAYLOAD };
