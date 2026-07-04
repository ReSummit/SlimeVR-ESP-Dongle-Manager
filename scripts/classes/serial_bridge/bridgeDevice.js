import ProtonDongleDevice from "../protonDongleDevice.js";
import BridgeManager from "./bridgeManager.js";

// A SlimeVR bridge presents the same management functions as the dongle
// (togglePairingMode, reboot, updateFirmware, enterDFU — inherited from
// ProtonDongleDevice), but uses BridgeManager to run at 921600 baud and strip the
// interleaved binary tracker feed off the serial stream.
class BridgeDevice extends ProtonDongleDevice {
    get ManagerClass() { return BridgeManager; }

    constructor(mainInstance, port) {
        super(mainInstance, port);
        this.name = "SlimeVR Bridge";
    }
}

export default BridgeDevice;
