---
title: "Novel Gasket Design for an Automated Pressurization Module"
excerpt: "A side-sealing gasket, printed on a Formlabs Form 4, that gives 5x the contact area of a standard rim seal for more reproducible microfluidic chip priming."
header:
  teaser: /assets/images/gasket-design.jpg
tags:
  - mechanical engineering
  - microfluidics
  - SLA printing
  - biotech
---

Priming a microfluidic chip means pushing gel and buffer into its channels under pressure before a run. If the seal between the priming hardware and the chip's wells leaks even slightly, the chip primes inconsistently, and that variability carries through to the assay results. This independent project in the Tripathi Lab was a chip-priming module built to make that step more reproducible.

{% include figure popup=true image_path="/assets/images/gasket-design.jpg" alt="Gasket mounted on an Agilent DNA chip, side profile of the gasket, and the chip-priming protocol" caption="Gasket mounted on a DNA chip (top), side profile of the gasket design (middle), and the chip-priming protocol (bottom)." %}

## The Design

The module was designed around closed-loop pressure sensing, with a separate pressure sensor in the line to verify the pressure delivered to the chip. The main contribution was the gasket, which is the part that decides whether any of that pressure actually reaches the chip.

A standard seal presses down on the rim of each sample well. Instead of relying on the rim alone, my gasket seals around the sides of the well. It is mounted so that the lip of a counterbore sits flush with the rim of each well, which puts it in contact with both the rim and the outside wall of the well at the same time.

## Fabrication

I printed the gasket on a **Formlabs Form 4** SLA printer in **Flexible 80A** resin. Post-processing was a 20-minute wash in isopropyl alcohol, a rinse in water, and a 10-minute UV cure at 35 °C. The flexible resin let the counterbore conform to each well while still holding the fine geometry needed to line up with the chip's well pattern.

For this stage I fabricated and tested the gasket itself, since that was the part the rest of the module depended on.

## Result

- **5x greater contact area** than a standard rim seal, giving a more reliable, consistent seal across repeated cycles
- Presented at **SLAS2026**, the Society for Laboratory Automation and Screening International Conference and Exhibition (February 7–11, 2026, Boston)
