# Visitor Center Wave Energy Display

This repository contains software and firmware for the operation of a energy generating
wave tank in the Hatfield Marine Science Center Visitor Center.

The hardware:
Drylin stepper motor MOT-AN-S-060-005-042-L-A-AAAA
Dryve D8, Step/Direction Stepper Motor controller
Arduino UNO R4 Minima
Honeywell ss441 unipolar hall sensors
Custom made interface shield for the Arduino UNO

Setup:
The dip switches are set as following
SW1...SW8 See datasheet in docs
off on on off on on on on


## Notes:
- If Ubuntu mini-comp is not connecting to arduino on initial try giving permissions to the electron process to open serial ports
    1. `sudo usermod -aG dialout $USER`
    2. Log out and log back in
