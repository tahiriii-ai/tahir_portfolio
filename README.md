# TA Embedded Solutions | Engineering Portfolio

This repository contains the portfolio website of Tahir Ali, a PCB Design Engineer working on ESP32 and STM32 hardware. Browse case studies for project requirements, design decisions, verification, and deliverables.

[Live portfolio](https://tahiriii-ai.github.io/ta-embedded-solutions/) · [All 12 case studies](https://tahiriii-ai.github.io/ta-embedded-solutions/#work) · [GitHub profile](https://github.com/tahiriii-ai)

## Featured engineering projects

| Project | My contribution |
| --- | --- |
| [ESP32 parcel-tracking system](https://tahiriii-ai.github.io/ta-embedded-solutions/projects/parcel-tracking-system.html) | Reviewed schematics, laid out two 4-layer PCBs for an ESP32-C3 Beacon and ESP32-S3 Gateway, prepared manufacturing files, and designed the printable Beacon enclosure. |
| [8-layer multi-radio IoT gateway](https://tahiriii-ai.github.io/ta-embedded-solutions/projects/multi-radio-gateway-layout.html) | Routed a 400+ component STM32H7 board with five RF sections and ten SMA feeds from a client-supplied schematic. |
| [ARC62 load-cell controller](https://tahiriii-ai.github.io/ta-embedded-solutions/projects/arc62-loadcell-repair.html) | Reconstructed the schematic from the PCB and BOM, then diagnosed four field issues. |
| [RejsaCAN v3.4 redesign](https://tahiriii-ai.github.io/ta-embedded-solutions/projects/rejsacan-v3-redesign.html) | Fit an ESP32-S3, CAN transceiver, USB-C, and microSD into a 30 × 50 mm PCB. |

## Portfolio website

Static website: plain HTML, one `styles.css`, one `script.js`. No build step, no dependencies, no framework. GitHub Pages compatible.

Live URL: https://tahiriii-ai.github.io/ta-embedded-solutions/

## Structure
- `index.html`: the single authoritative home page (hero workflow, trust strip, services, 8-stage process, featured projects, why work with me, technologies, client review, about, final CTA)
- `services/`: `index.html` plus five service pages (complete product development, firmware, hardware prototyping, PCB design, 3D enclosure design)
- `projects/`: `index.html` (filterable overview) plus 12 case studies. File names are unchanged from the previous site, so old links still work.
- `about.html`, `contact.html` (inquiry form + 15-question FAQ), `404.html`
- `images/` (WebP versions of every render and photo, originals kept alongside; `illustrations/` holds one conceptual SVG (firmware capability map); `breadboard-prototype*.webp` is a photo of my own ESP32 bench prototype; `og-image.jpg` is the social preview), `fonts/` (self-hosted Space Grotesk, Inter, JetBrains Mono), `videos/`, `Tahir_Ali_Resume.pdf`
- `sitemap.xml`, `robots.txt`, `.nojekyll`, `favicon.svg`

## Run locally
Use a local server so fonts load: `python3 -m http.server` in this folder, then open http://localhost:8000

## Deploy on GitHub Pages
1. Copy the contents of this folder to the root of the `ta-embedded-solutions` repository (replace the old files; delete old `index.html`, `styles.css`, `script.js`, `projects/*` first so no outdated homepage remains).
2. Repo Settings, Pages: Source "Deploy from a branch", branch `main`, folder `/ (root)`. Make sure no `docs/` folder or second branch is selected as the source.
3. Commit and push. After 1 to 2 minutes `https://tahiriii-ai.github.io/ta-embedded-solutions/` and `.../index.html` serve the same file. CSS and JS carry a `?v=` version so browsers fetch the new files; hard refresh once if you still see the old design.

## Still needs your configuration
1. **Inquiry form (FormSubmit).** It posts to `formsubmit.co/ajax/tahiraliaiml@gmail.com` (as before) with a copy to `tahiralielectrical@gmail.com`. The first real submission makes FormSubmit email an activation link to that address; click it once. Until then the form shows an honest error with email and WhatsApp fallbacks and keeps the visitor's text. File upload is not supported by this setup, so the form asks for a link (Drive, Dropbox, GitHub).
2. **More bench photos.** The breadboard tile and hardware prototyping page use one real photo (my ESP32 breadboard). Add more photos of your bench work, and replace `images/illustrations/firmware.svg` with a real firmware screenshot or serial log if you have one.
3. **Firmware case study.** Existing case studies are PCB, layout, diagnosis and enclosure work (client supplied firmware on the parcel system). Adding one firmware-plus-breadboard project would strengthen the firmware-first positioning.
4. **Policies to confirm.** The FAQ describes revisions and post-fabrication support in general terms ("agreed in the project scope"). Edit `contact.html` if you want specific numbers.
