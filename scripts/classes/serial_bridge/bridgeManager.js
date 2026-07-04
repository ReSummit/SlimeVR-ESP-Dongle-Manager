import DongleManager from "../dongleManager.js";
import FrameParser from "./frameParser.js";

// Manager for a SlimeVR bridge board. Behaves like the dongle (inherits the [SC]
// command protocol, pairing UI, and tracker handling from DongleManager), but the
// bridge also interleaves binary HID tracker frames (0xA5 0x5A ... crc8) into the
// serial stream. Those are stripped out here before line assembly and discarded —
// forwarding them to SlimeVR is the Python bridge's job, and the two never hold the
// port at once.
class BridgeManager extends DongleManager {
    // Bridge boards stream at 921600 (see slimevr_serial_bridge.py). Flows through the
    // this.baudRate port.open() in Manager.connect() and the ESPTool fallback.
    baudRate = 921600;

    frameParser = new FrameParser();

    // Remove the binary frames from the raw chunk, keeping only the text bytes ([SC]
    // protocol + debug) in stream order for the base read loop's line assembly.
    ingestChunk(value) {
        const text = [];
        for (const seg of this.frameParser.feed(value)) {
            if (seg.type === 'text') {
                for (let i = 0; i < seg.bytes.length; i++) text.push(seg.bytes[i]);
            }
            // seg.type === 'frame' -> a tracker HID transfer; discarded here.
        }
        return text;
    }

    async connect () {
        this.frameParser.reset(); // clear any stale partial-frame bytes on reconnect
        return super.connect();
    }
}

export default BridgeManager;
