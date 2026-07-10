# Flashing ESPNOW

This page will guide you through flashing your SlimeVR Trackers to support ESPNOW.

## Table of Contents

- TOC
{:toc}

## Flashing Firmware to Trackers

In order to allow ESPNOW communications, it is necessary to flash new firmware to your trackers. Flashing firmware is similar to the process of updating your trackers in the SlimeVR Server application. ESPNOW firmware updating is not built into the SlimeVR Server, so you will need to manually flash your trackers.

**DISCLAIMER: This firmware is not a part of the official SlimeVR firmware yet. Make sure you understand the risks before proceeding with flashing the firmware.**

There is pre-compiled firmware available to use. Please download the firmware that corresponds to the tracker you have:

TODO: Put here compiled builds from CI for SlimeVR Official Trackers v1.0 and v1.2

* v1.0: [Firmware (untested)](https://github.com/ReSummit/SlimeVR-Tracker-ESP/releases/download/v0.7.2_ESPNOW/BOARD_SLIMEVR-firmware.bin)
* v1.2: [Firmware (untested)](https://github.com/ReSummit/SlimeVR-Tracker-ESP/releases/download/v0.7.2_ESPNOW/BOARD_SLIMEVR_V1_2-firmware.bin)

Other tracker builds can be found below (temporary while the official builds don't exist yet):  
https://github.com/ReSummit/SlimeVR-Tracker-ESP/releases/tag/v0.7.2_ESPNOW

NOTE: For all other tracker builds, please instead download the source code from the repository below and compile manually. Follow the instructions in the DIY Builder's Guide for uploading the tracker firmware, but use the repository linked below. **When setting up the environment, follow the instruction on step 4 regarding clicking the Source Control button and select the esp-now branch (WITH the hyphen)**:  
[https://github.com/mitzey234/SlimeVR-Tracker-ESP/tree/esp-now](https://github.com/mitzey234/SlimeVR-Tracker-ESP/tree/esp-now)

For official trackers, we will use over-the-air (OTA) to flash. This method requires the tracker to be connected to WiFi. The WiFi network should be the same one your computer is connected to. If you have not set this up, please follow tthe [Quick Setup](https://docs.slimevr.dev/quick-setup.html) guide.

### OTA Flashing

**Before beginning this step, make sure you turn off SlimeVR! If it is minimized, find SlimeVR in the tray area of your computer. Right click on the icon and press "Exit".**

To do OTA flashing, you will need to download the OTA flash tool. You can find the one for your OS below:

* Windows: [SlimeVR-OTA-GUI_win-x64.zip](https://github.com/ButterscotchV/SlimeVR-OTA-CLI/releases/download/v0.3.1/SlimeVR-OTA-GUI_win-x64.zip)
* Linux: [SlimeVR-OTA-GUI_linux-x64.zip](https://github.com/ButterscotchV/SlimeVR-OTA-CLI/releases/download/v0.3.1/SlimeVR-OTA-GUI_linux-x64.zip)

Extract the downloaded file into a new folder and open the executable inside. You should see the interface below:
![A picture of the SlimeVR OTA Tool program.](imgs/slimevr_ota.png)

Press the "Select Firmware" Button to open a file selection dialog. Select the firmware you downloaded from the [Flashing Firmware](#flashing-firmware) step.

Turn on **1 singular tracker** and observe that you see a set of numbers on the 2nd row representing your tracker.

Note: When flashing your trackers, ensure that you only have one tracker on at the same time! Make sure to keep track of which trackers have been flashed already.

Once you confirm both, you can press the "Flash Tracker" button. Be patient as it will take some time for the tracker to be flashed.

**WARNING: DO NOT TOUCH THE TRACKER DURING THE FLASH AND 10 SECONDS AFTER COMPLETION.**

After waiting for the confirmation that the flash is complete, as well as waiting 10 seconds, you can turn off and on the tracker. 

When you turn on the tracker, ensure you see a stable blue light from the tracker that remains on for aroudn 2 seconds. If this happens, you successfully flashed the tracker and can turn it off for now.

Repeat the flashing process for additional trackers.

## Next Steps

Once you have flashed your dongle and trackers, you may proceed to [Pairing ESPNOW Trackers](./02-Pairing_ESPNOW_Trackers.md).