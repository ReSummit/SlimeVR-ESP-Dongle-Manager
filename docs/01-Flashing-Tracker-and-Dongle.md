# Flashing ESPNOW to Trackers

This page will guide you through flashing your SlimeVR Trackers to support ESPNOW.

## Table of Contents

- TOC
{:toc}

## Flashing Firmware

In order to allow ESPNOW communications, it is necessary to flash new firmware to your trackers. Flashing firmware is similar to the process of updating your trackers in the SlimeVR Server application. ESPNOW firmware updating is not built into the SlimeVR Server, so you will need to manually flash your trackers.

**DISCLAIMER: This firmware is not a part of the official SlimeVR firmware yet. Make sure you understand the risks before proceeding with flashing the firmware.**

There is pre-compiled firmware available to use. Please download the firmware that corresponds to the tracker you have:

TODO: Put here compiled builds from CI for SlimeVR Official Trackers v1.0 and v1.2

* v1.0: Firmware
* v1.2: Firmware

NOTE: For all other tracker builds, please instead download the source code from the repository below and compile manually. Follow the instructions in the DIY Builder's Guide for uploading the tracker firmware, but use the repository linked below. **When setting up the environment, follow the instruction on step 4 regarding clicking the Source Control button and select the esp-now branch (WITH the hyphen)**:  
[https://github.com/mitzey234/SlimeVR-Tracker-ESP/tree/esp-now](https://github.com/mitzey234/SlimeVR-Tracker-ESP/tree/esp-now)

