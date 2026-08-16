# Design previews

Standalone HTML mockups used to choose the current homepage design. Nothing here is part of the build — Next never sees this folder — but they are the record of what was considered and why, so they are kept rather than deleted.

Open any of them by double-clicking. They pull the real photography from `../public/images/` and the real Fraunces / Archivo fonts from `../src/fonts/`, so **they must stay in this folder** to render correctly.

| File | What it is | Outcome |
|---|---|---|
| `hero-options.html` | Six hero treatments: cinematic, split editorial, overlap card, framed panorama, duotone stage, and cinematic + service rail | **A2 shipped** — cinematic full-bleed with the five-service rail |
| `services-options.html` | Five treatments for "What we do": bento mosaic, sticky parallax stack, 3D tilt, filmstrip reel, focus spotlight | **Filmstrip shipped** as `ServicesReel` |
| `background-options.html` | Five section-background textures: mowing stripes, topographic contours, blueprint grid, aurora wash, botanical linework | **None shipped** — flat bone / forest-950 kept |
| `preview-home.html` | Static snapshot of the built homepage. Layout, texture and type are exact; interactions are not live | Reference only |

To see the real thing with working interactions — reel drag, hero rail rotation, season accordion — run `npm run dev` from the project root and open `localhost:3000`.
