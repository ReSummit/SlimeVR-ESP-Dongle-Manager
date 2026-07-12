# Unresolved questions that need to be answered in instructions

The following needs to be addressed or answered somewhere in the instructions:

* "Oh i flashed my tracker with esp-now, how do i get back?"
* "How do you put your tracker in flash mode on esp now?"
* "How do I know which firmware to download / flash?"
* "My dongle isn't showing up in the Dongle Manager..."
* "I'm not seeing any trackers show up in the SlimeVR Server application"
* "What if my tracker's battery is low before flashing?"
* "How do I flash a dongle?"
* "Why do I need to do a wifi channel scan?"
* "Does this work with secondary trackers?"
* "What's an encryption key?"
* "What if there's multiple people using this receiver?"
* "How do I know someone else won't see my tracking data?"

# Important configuration notes
The following are notes regarding configuration that are important for operation:

* Performance of ESPNOW worsens if it is under a large copper / metal area
    * Ex. Terminal block adapter for ESP32-S3
* ESPNOW on ESP32-S3 clones bought from Aliexpress may have issues. Cheap as they are, you're mostly guessing that the seller is giving you a good module.
    * Official ESP modules may be more sensitive to ESPNOW than over wifi (either ESP32 or ESP8266), so needs caution on this.