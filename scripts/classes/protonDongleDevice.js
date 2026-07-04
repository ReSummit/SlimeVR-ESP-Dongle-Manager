import SerialDevice from "./serialDevice.js";
import DongleManager from "./dongleManager.js";
import { ESPLoader } from "../esptool.js";

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class ProtonDongleDevice extends SerialDevice {
    trackers = new Map();

    // Manager class instantiated in the constructor. Overridable via virtual dispatch
    // so subclasses (e.g. BridgeDevice) swap in their own manager without a throwaway.
    get ManagerClass() { return DongleManager; }

    constructor(mainInstance, port) {
        super(mainInstance, port, "SlimeVR Dongle");
        this.manager = new this.ManagerClass(mainInstance, this);
    }

    async updateFirmware(firmware) {

    }

    async updateTrackers(firmware) {

    }

    async enterDFU() {
        let esploader = new ESPLoader(this.port, {
            log: (...args) => console.log(...args),
            debug: (...args) => console.debug(...args),
            error: (...args) => console.error(...args),
        });

        let attempts = 0;
        while (this.port.connected) {
            if (attempts > 5) {
                console.error('Failed to enter DFU mode after multiple attempts.');
                return;
            }
            await esploader.hardResetClassic();
            attempts++;
        }

        console.log('ESP32 should now be in bootloader mode.');
    }

    async togglePairingMode() {
        await this.manager.sendCommand("pair");
    }

    async reboot() {
        await this.manager.sendCommand("reboot");
    }

    async updateFirmware (tag = null, firmware = null) {
        if (this.main.pendingFirmwareUpdate != null) {
            console.warn('Firmware update already pending, skipping new update request');
            return;
        }
        this.main.pendingFirmwareUpdate = {
            mac: this.manager.dongleContainer.macAddress,
            tag: tag ?? this.main.firmwareVersion,
            board: this.manager.dongleContainer.boardName
        }
        if (firmware != null) this.main.pendingFirmwareUpdate.firmware = firmware;
        this.manager.connecting = false;
        this.manager.updating = true;
        await this.enterDFU();
    }
}

export default ProtonDongleDevice;