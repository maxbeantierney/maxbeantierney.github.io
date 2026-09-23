---
title: "Electromagnet Upgrade: Checking Plate Saturation with Magnetostatic FEA"
excerpt: "Before moving Vivvity's clamp from four small electromagnets to two 160 lbf magnets, I used hand calculations and Ansys magnetostatic FEA to check whether the steel plate could carry the flux."
header:
  teaser: /assets/images/electromagnet-fea.jpg
tags:
  - Ansys
  - FEA
  - mechanical engineering
  - biotech
---

The gantry and electromagnetic lock test from June used four cylindrical electromagnets rated at 26 lbf each, pulling against a 1018 steel plate on the electrode block. I wanted more clamping margin and a simpler layout, so I evaluated replacing them with two rectangular electromagnets rated at 160 lbf each.

## The Concern: Plate Saturation

All of the clamping force passes through the steel plate on the electrode block. The plate is thin because Vivvity's vertical travel is tightly constrained, and a thin plate can only carry so much magnetic flux before it saturates. Past that point, extra coil current buys very little extra force, and the excess flux leaks into the surroundings instead of pulling on the plate.

My hand calculations put the flux density in the plate at about 2.3 T with the new magnets, which is above where 1018 steel saturates. That was a strong enough warning that I didn't want to buy and install the magnets without checking it properly.

Impact loading was not a concern. The gantry lowers the plate into contact before the magnets are energized, so the magnets never snap the plate in from a distance.

## Simulation

I built an Ansys Mechanical magnetostatic model of the plate and both magnets:

- **Materials:** a nonlinear B-H curve for 1018 steel, so the model could actually show saturation instead of assuming linear behavior
- **Coils:** modeled as stranded conductors with the magnets' current and turn count
- **Air domain:** an enclosure around the full assembly so the model could capture flux leakage
- **Shared topology** between bodies that touch, which the magnetostatic solver needs in order to treat them as connected

To get clamping force, I used a force summation over the whole plate body rather than reading values off the flux contour plot. Contour maximums are local mesh extremes, not the total force on the part. I then worked through the model setup until both magnets gave consistent results.

{% include figure popup=true image_path="/assets/images/electromagnet-fea.jpg" alt="Ansys magnetostatic FEA contour plot of total magnetic flux density in the clamp plate" caption="Ansys Mechanical magnetostatic FEA: total magnetic flux density in the plate." %}

## Result

The simulation, checked against physical testing, confirmed the two-magnet design, and I switched the clamp over to it. The clamp now holds a reliable chip seal to **30 psi**.

{% include figure popup=true image_path="/assets/images/clamp-test-rig.jpg" alt="Clamp interface hardware on the bench" caption="Clamp interface hardware on the test rig." %}
