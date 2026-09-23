---
title: "Video: Full System Run with Closed-Loop Pressure Control"
excerpt: "Vivvity running a full cycle: homing, lowering onto the chip, electromagnetic clamping, closed-loop pressurization that holds within about 0.15 psi, release, and park."
header:
  teaser: /assets/images/vivvity-full-assembly.jpg
tags:
  - firmware
  - controls
  - mechanical engineering
  - biotech
---

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin-bottom: 1em;">
  <iframe src="https://drive.google.com/file/d/1GwDZmJEaPprPjCF_aTV89yneC2GNSrJ7/preview"
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
          allow="autoplay; fullscreen" allowfullscreen></iframe>
</div>

This is the first run of Vivvity's gantry, clamp, and pressure system working together as one instrument. In the video, the system:

1. Homes both axes
2. Lowers the electrode block onto the microfluidic chip
3. Locks the block to the chip with the electromagnetic clamp
4. Pressurizes the chip with the syringe pump and holds the seal under pressure
5. Releases the clamp and returns to its park position

{% include figure popup=true image_path="/assets/images/vivvity-full-assembly.jpg" alt="The assembled Vivvity gantry and electromagnetic clamping subsystem" caption="The assembled gantry and electromagnetic clamping subsystem." %}

## Gantry and Clamp

This subsystem sits inside the instrument's main liquid-handling gantry, so its vertical travel has to stay small to avoid hitting the primary gantry's pipette toolhead. At the same time, the electrode block has to land flat and in the same place on every cycle, since even a small deviation breaks the seal.

I used a dual lead-screw motion system for the horizontal and vertical axes. Lead screws are self-locking, so once the mechanism reaches position it holds the clamp load mechanically, without the motor drawing current or fighting the load. That matters because the system stays clamped under pressure for the whole run, and I didn't want it drifting or overheating a driver.

{% include figure popup=true image_path="/assets/images/vivvity-gantry-cad.jpg" alt="CAD model of the dual lead-screw gantry" caption="CAD model of the dual lead-screw gantry." %}

## Closed-Loop Pressure Control

The syringe pump drives fluid through the chip during a run, and I built both the sensing and the control loop for it.

**Sensing.** Pressure is read from a Honeywell MPRLS sensor through a custom I²C interface I wrote into the Marlin firmware (C++). The sensor reads absolute pressure, so the firmware tares it at the start of a session to get a gauge reading referenced to atmosphere.

**Control.** The syringe pump is a stepper on its own axis. It homes with a pressure headroom offset, so it can start building pressure right away without a manual retract step. Getting to a target pressure quickly and holding it precisely need different behavior, so I split the controller into three phases:

- **Fast phase:** an adaptive feedforward estimate closes most of the distance to the setpoint in one move
- **Fine phase:** closes the remaining gap more slowly
- **Hold phase:** proportional control with a small anti-stiction dither, which keeps the plunger from sticking and then jumping past the target

{% include figure popup=true image_path="/assets/images/syringe-pump-pressure.jpg" alt="Syringe pump and pressure sensor isolated on the bench for testing" caption="Syringe pump and pressure sensor, isolated for testing." %}

## Result

- Pressure holds to about **0.15 psi** of the setpoint
- The adaptive feedforward ramp reaches a target pressure faster than a fixed-gain approach
- The gantry, clamp, and pressure system run a complete cycle from homing to park
