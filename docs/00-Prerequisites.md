# Introduction to ESPNOW

This page will guide you through setting up what you need to transisition your SlimeVR trackers to ESPNOW.

## Table of Contents

- TOC
{:toc}

## What is ESPNOW?

Previously, SlimeVR ESP type trackers communicate data about their position and rotation over a wireless connection. Every tracker typically needs to be configured with WiFi credentials in order to connect to a router and transmit the data to the SlimeVR Server application on your computer connected to the same router.

Here, instead of the tracker communicating their data over the network, trackers now transmit their data to a dongle connected to your computer. The SlimeVR trackers will transmit their data directly to the dongle instead of over the network. For your SlimeVR ESP trackers, this is able to be done with ESPNOW.

For your trackers to be able to use ESPNOW, they will need new firmware. In addition, you will also need hardware in order to receive this new data to your computer. This will be explained in later sections.

### ESPNOW and Security

When your trackers send data wirelessly, that data travels through the air. Without any protection, someone nearby with the right tools could potentially intercept and view your tracking data.

To prevent this, ESPNOW uses an **encryption key**. An encryption key is a piece of text that acts like a secret password shared between your trackers and your dongle. When a tracker sends data, it scrambles the data using this key. Only a dongle that knows the same key can unscramble it. Anyone else who intercepts the signal will only see meaningless scrambled data.

You do not need to create or manage this key yourself. The encryption key is automatically set up during the pairing process. Once a tracker is paired with your dongle, they both share the same key and all communication between them is encrypted.

**What if multiple people are using ESPNOW nearby?**

Each dongle has its own unique encryption key. When you pair your trackers, they are locked to your specific dongle. Another person's dongle nearby will not be able to read your tracker data, and your dongle will not pick up their trackers. Even at events where multiple people are using ESPNOW at the same time, each person's setup remains separate and private.

## Secondary Trackers Note

**NOTE: As of July 13, 2026 (7/13/2026), secondary trackers are not yet supported. This includes secondary trackers on officials as well as trackers that employ more than 2 trackers.**

**Development is currently in progress to support secondary trackers, but need more work. Please help contribute if you can!**

## Required Hardware and Software

In order to use ESPNOW, you need the necessary hardware and software. Below, we will walk you through the hardware you need to obtain, as well as the software to manage the tracker and dongle.

### Hardware

Currently, there is a specific part that you need to use ESPNOW. This implementation currently only works with an ESP32-S3 or ESP32-S2 microcontroller.

**IMPORTANT: You will need to get specific microcontrollers that work with this solution. Specifically, you need one that has something called "USB-OTG". Not all microcontrollers have this.**

#### A Note on Clone / Unbranded ESP32-S3 Boards

It is common to find very cheap ESP32-S3 boards from marketplaces like Aliexpress. While these can work, be aware of the following:

* **Quality is inconsistent.** Clone boards from unknown sellers may use lower quality components. There is no guarantee that the wireless performance will match an official ESP module, and some boards may not work reliably with ESPNOW at all.
* **ESPNOW can be more sensitive than WiFi.** A board that works fine over WiFi may still have poor ESPNOW performance if the antenna or radio components are subpar. This is because ESPNOW relies on direct device-to-device communication without a router to help manage the signal.

If you are buying from a lesser-known seller, be prepared for the possibility that the board may not work well. When possible, prefer boards from established brands (such as Seeed Studio, Adafruit, or Espressif's own devkits) for a more reliable experience.

#### Compatible Dongle Hardware

Below is a running list of microcontrollers that are compatible as a dongle:

<span style="color:#2ecc40;font-weight:bold">Green</span>: Tested and confirmed working.  
<span style="color:#e67e22;font-weight:bold">Yellow</span>: Theoretically works but untested.  

<div class="table-wrapper">
  <table class="transform-table-to-list-on-mobile">
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Typical Price (USD)</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Name: "><span style="color:#2ecc40;font-weight:bold">Seeed Studio XIAO ESP32-S3 Plus</span></td>
        <td data-label="Type: ">ESP32-S3</td>
        <td data-label="Typical Price (USD): ">~$7.90</td>
        <td data-label="Notes: ">Smallest microcontroller with HID. Has external antenna support.</td>
      </tr>
    </tbody>
  </table>
</div>

### Software

Additional software is required to communicate with the dongle. This provides a graphical interface to assist with connecting trackers. For this, you can download the software below. Below are links to the lastest relase for your operating system:

* Windows: [slimevr-esp-dongle-manager-0.2.1.Setup.exe](https://github.com/mitzey234/SlimeVR-ESP-Dongle-Manager/releases/download/v0.2.1/slimevr-esp-dongle-manager-0.2.1.Setup.exe)
* Linux: [slimevr-esp-dongle-manager_0.2.1_amd64.deb](https://github.com/mitzey234/SlimeVR-ESP-Dongle-Manager/releases/download/v0.2.1/slimevr-esp-dongle-manager_0.2.1_amd64.deb)

The installer will install the dongle manager as an application named "slimevr-esp-dongle-manager".

## Next Steps

Once you have your hardware and software obtained, you may proceed to [Flashing Tracker and Dongle](./01-Flashing-Tracker-and-Dongle.md).