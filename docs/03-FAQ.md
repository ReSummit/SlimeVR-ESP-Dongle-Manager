# Frequently Asked Questions

This page covers common questions and concerns about using ESPNOW with your SlimeVR trackers.

## Table of Contents

- TOC
{:toc}

## General Questions

### Does this work with secondary trackers?

**NOTE: As of July 13, 2026, secondary trackers are not yet supported.** This includes secondary trackers on official SlimeVR trackers as well as setups that use more than one tracker per strap. Development is currently in progress to support secondary trackers, but more work is needed. Please help contribute if you can!

### What is an encryption key?

An encryption key is a piece of text that acts like a secret password shared between your trackers and your dongle. When your tracker sends data, it uses this key to scramble the information so that only your dongle can read it. You do not need to create or manage this key yourself — it is automatically set up when you pair your trackers with your dongle. For more details, see the [ESPNOW and Security](./00-Prerequisites.md#espnow-and-security) section in the Prerequisites page.

### Why do I need to do a WiFi channel scan?

Wireless devices in your environment (routers, phones, other electronics) are constantly using different channels to communicate. A WiFi channel scan checks which channels are the busiest and picks the one with the least activity for your dongle to use. This helps your trackers communicate with your dongle with less interference, giving you a more stable and reliable connection.

## Privacy and Multiple Users

### How do I know someone else won't see my tracking data?

All data sent between your trackers and your dongle is encrypted. This means the data is scrambled using a key that only your trackers and your dongle know. Even if someone nearby has the right tools to listen in on wireless signals, they would only see scrambled, unreadable data. For more details, see the [ESPNOW and Security](./00-Prerequisites.md#espnow-and-security) section in the Prerequisites page.

### What if multiple people nearby are also using ESPNOW?

Each dongle has its own unique encryption key that is created during pairing. Your trackers will only talk to the dongle they were paired with, and your dongle will only listen to its own paired trackers. This means another person's ESPNOW setup nearby will not interfere with yours, and they will not be able to see your tracking data.

If you are at an event or meetup where many people are using ESPNOW, the best thing you can do is make sure everyone runs a WiFi channel scan on their dongle before starting. This allows each dongle to pick the least congested channel, which helps reduce wireless interference between setups.

## Flashing and Firmware

### I flashed my tracker with ESPNOW firmware. How do I go back to WiFi?

To go back to the standard SlimeVR WiFi firmware, you will need to re-flash your tracker via USB. Since your tracker is no longer connected to WiFi, OTA (over-the-air) flashing will not work. Follow the USB recovery instructions on the SlimeVR docs: [Updating Firmware](https://docs.slimevr.dev/updating-firmware.html). You can also see the [Recovering Tracker Firmware via USB](./01-Flashing-Tracker-and-Dongle.md#recovering-tracker-firmware-via-usb) section on the Flashing page.

### How do I put my tracker into flash mode when using ESPNOW?

Since ESPNOW firmware does not connect to WiFi, you cannot flash over-the-air. You will need to connect the tracker to your computer using a USB cable and flash it directly. The exact steps for entering flash mode depend on your tracker's PCB revision — the SlimeVR docs cover this in detail: [Updating Firmware](https://docs.slimevr.dev/updating-firmware.html).

### How do I know which firmware to download?

The firmware you need depends on the type of microcontroller inside your tracker. You will need to check what kind of ESP microcontroller your tracker uses (for example, ESP8266 or ESP32) and download the firmware that matches it. If you are unsure, look at the microcontroller chip on your tracker's board and compare it to the options listed on the [Flashing Tracker and Dongle](./01-Flashing-Tracker-and-Dongle.md) page. If your microcontroller type is not listed, you may need to compile the firmware yourself — instructions for this are also on that page.

### What if my tracker's battery is low before flashing?

Make sure your tracker has enough charge before you begin flashing. If the tracker loses power during a flash, the firmware update may not complete properly, which could leave your tracker in a broken state. It is recommended to charge your tracker fully or keep it plugged in while flashing to avoid any issues.

## Troubleshooting

### My dongle isn't showing up in the Dongle Manager.

Try the following steps:

* Make sure your dongle is plugged into your computer with a USB cable. If your dongle has two USB ports, check the underside — connect using the port labeled "USB".
* Try a different USB cable. Some cables are charge-only and do not carry data.
* Try a different USB port on your computer.
* Make sure the dongle has been flashed with the ESPNOW receiver firmware. If you have not done this, see the [Flashing Tracker and Dongle](./01-Flashing-Tracker-and-Dongle.md) page.

### I'm not seeing any trackers in the SlimeVR Server application.

* Make sure your trackers have been flashed with the [ESPNOW firmware](./01-Flashing-Tracker-and-Dongle.md), not the standard SlimeVR WiFi firmware.
* Make sure your trackers have been paired with the dongle. If you have not done this, see the [Pairing ESPNOW Trackers](./02-Pairing_ESPNOW_Trackers.md) page.
* Make sure the dongle is connected in the SlimeVR ESP Dongle Manager and that the SlimeVR Server is running.
* Try running a WiFi channel scan on the dongle to find a less congested channel.
