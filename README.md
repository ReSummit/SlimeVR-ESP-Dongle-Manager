# HID Serial Bridge Fork

This fork of the dongle manager adds in support for interfacing with dongles using serial as the communication method versus HID. This also adds fixes for linux where trackers using a CH340 or similar TTL chip do not get detected in the application due to how linux does serial enumeration.

This app is meant to be used alongside the dongle firmware below, but can also be used with the original dongle firmware with HID:
https://github.com/ReSummit/SlimeVR-Receiver-ESP-Now/tree/esp8266

**NOTE: You cannot connect to the dongle through the manager and use the bridge program in the above linked repository at the same time.** 

**If you want to change settings on the dongle, you will need to stop the bridge program before connecting with the dongle manager. Conversely, if you want to use the dongle with the SlimeVR server, you must disconenct the dongle from the dongle manager before running the bridge program.** 

## Modifications

Interfacing with the dongle manager is the same, just that you now have support for serial based dongles. However, connecting to them involves a different workflow.

### Connecting to Serial Dongles

- Dongles with a recognized USB serial number will be detected automatically on startup, the same as HID dongles. It may take a bit longer for a tracker to be visible in order to check if a tracker is a serial based dongle (up to 7 seconds).
- For boards without a USB serial number (e.g. CH340), you need to manually trigger detection:
  1. Click the **plug icon** in the title bar (next to the minimize button).
  2. The app will automatically scan for and probe any connected serial devices at 921600 baud for up to 7 seconds to determine if they are bridge dongles or plain ESP devices.
  3. If a device responds, it will appear in the manager as a bridge dongle ready for use.
- On **Linux**, if the dongle is unplugged and plugged back in, you will need to click the plug icon again to re-detect it. This is not required on Windows.

### Other Changes

- **Linux CH340 fix** — Boards using a CH340 or similar TTL chip that were not detected due to how Linux handles serial enumeration are now supported.
- **Supported USB-serial chips** — CH340, CH9102, CP210x, and Espressif native-USB are recognized for filtering.
- **Bridge firmware baud rate** — Serial bridge dongles communicate at 921600 baud (vs. 115200 for standard HID dongles).
- **Tracker data handled separately** — The dongle manager only handles management commands. Binary tracker data frames are handled by the separate Python bridge program, which is why both programs cannot connect to the dongle at the same time.

# SlimeVR-ESP-Dongle-Manager
This is an Electron application to help manage and control firmware on an ESP-based SlimeVR tracker dongle.
![alt text](images/Shot1.png?raw=true)

## Download (Recommended)
Most users should install the latest prebuilt release from GitHub:

https://github.com/mitzey234/SlimeVR-ESP-Dongle-Manager/releases/latest

This is the easiest way to get started and avoids local build setup.

## macOS Warning (Unsigned App)
This app is currently **not signed** for macOS.

After downloading, you may need to remove quarantine attributes before launching:

```bash
xattr -cr /path/to/application.app
```

You may also need to allow launch manually in **System Settings**:
- Go to **Privacy & Security**
- Find the blocked app message
- Click **Open Anyway**

## Build Locally (Developers)
Use this section if you want to develop, test changes, or build your own binaries.

### Requirements
- Node.js and npm

### Install dependencies
```bash
npm install
```

### Run in development
```bash
npm start
```

Optional (watch Tailwind output):
```bash
npm run watch
```

### Build distributables
```bash
npm run package
npm run make
```

## TODO
- [ ] Add support for custom firmware files (local file picker)
- [ ] Add a modal for OTA updates for trackers
- [ ] Add more information about individual trackers such as IMU type, ESP type, board type, etc. (this will require new firmware on the dongle to intercept some of the frames sent by the trackers)
- [ ] Add a settings panel
	- [ ] Baud rate settings
	- [ ] User background settings
	- [ ] Disable / enable infinite log history
	- [ ] Change the max history of the logs
	- [ ] Show / hide timestamps in terminal
	- [ ] Use milliseconds since boot instead of time in terminal
	- [ ] Clear firmware temporary files
	- [ ] Setting that forces the program to allow flashing firmware anyway

## Credits
This project uses/derives tooling and ideas from WebSerial_ESPTool by Jason2866:

https://github.com/Jason2866/WebSerial_ESPTool

## Project Scope & Support
This is a hobby project maintained in spare time for a relatively small user group.

- Pull requests are welcome and will be reviewed when time allows.
- Reported issues are appreciated and will be triaged as availability permits.
- There is no guaranteed response or merge timeline.

