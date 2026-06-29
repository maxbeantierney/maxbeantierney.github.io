---
title: "Video: Gantry and Electromagnetic Lock Test"
excerpt: "Demonstrating electromagnet clamping control and crash-prevention firmware logic on the Vivvity gantry."
tags:
  - firmware
  - mechanical engineering
  - biotech
---

<video width="100%" controls>
  <source src="/assets/videos/gantry_run_1.mp4" type="video/mp4">
</video>

I have now implemented control of the electromagnets into the firmware and software. The gantry moves the electrodes down 1mm during the locking procedure to seat the electromagnets, and then moves up 1mm on release to ensure any residual magnetism doesn't interfere with future movements. A clicking sound can be heard in the video when the 4 electromagnets lock on to the steel plate mounted to the electrode block.

Additionally, I have implemented crash-prevention logic in the firmware. Any movement at or below the height of the chip will automatically first move the gantry to a safe height before it completes the movement. All buttons in the software simply call a macro defined in the firmware, ensuring that at the lowest level the system remains reliable. Both dual motor assemblies for the Y and Z axis use an open-loop design, but feature an independent optical limit switch for each motor. This ensures that the gantry remains perfectly straight after homing.

Next steps include testing pressure holding capabilities with an integrated syringe pump, as well as migrating the chassis to aluminum parts to maintain a seal under pressure.
