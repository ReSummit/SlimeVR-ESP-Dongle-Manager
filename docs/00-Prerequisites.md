# Introduction to ESPNOW

This page will guide you through setting up what you need to transisition your SlimeVR trackers to ESPNOW.

## Table of Contents

- TOC
{:toc}

## What is ESPNOW?

Previously, SlimeVR ESP32 trackers communicate data about their position and rotation over a wireless connection. Every tracker typically needs to be configured with WiFi credentials in order to connect to a router and transmit the data to the SlimeVR Server application on your computer connected to the same router.

Here, instead of the tracker communicating their data over the network, trackers now transmit their data to a dongle connected to your computer. The SlimeVR trackers will transmit their data directly to the dongle instead of over the network. For your SlimeVR ESP32 trackers, this is able to be done with ESPNOW.

For your trackers to be able to use ESPNOW, they will need new firmware. In addition, you will also need hardware in order to receive this new data to your computer. This will be explained in the next section.

## Required Hardware and Software

In order to use ESPNOW, you need the necessary hardware and software. Below, we will walk you through the hardware you need to obtain, as well as the software to manage the tracker and dongle.

### Hardware

Currently, there is a specific part that you need to use ESPNOW. This implementation currently only works with an ESP32-S3 or ESP32-S2 microcontroller.

**IMPORTANT: You will need to get specific microcontrollers that work with this solution. Specifically, you need one that has something called "USB-OTG". Not all microcontrollers have this.**

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

You will also need to download software in order to connect your trackers to the dongle. Navigate to below to download the program for your operating system:

* Windows: [slimevr-esp-dongle-manager-0.2.1.Setup.exe](https://github.com/mitzey234/SlimeVR-ESP-Dongle-Manager/releases/download/v0.2.1/slimevr-esp-dongle-manager-0.2.1.Setup.exe)
* Linux: [slimevr-esp-dongle-manager_0.2.1_amd64.deb](https://github.com/mitzey234/SlimeVR-ESP-Dongle-Manager/releases/download/v0.2.1/slimevr-esp-dongle-manager_0.2.1_amd64.deb)

The installer will install the dongle manager as an application named "slimevr-esp-dongle-manager".

## Next Steps

Once you have your hardware and software obtained, you may proceed to [Flashing Tracker and Dongle](./01-Flashing-Tracker-and-Dongle.md).