# Password Generator

A minimal Chromium extension that generates strong random passwords. No network
access, no storage, no permissions — it only ever touches the popup you open.

![](icons/icon48.png)

## Install

1. Open `chrome://extensions` (or `brave://extensions`).
2. Turn on **Developer mode**.
3. **Load unpacked** → select this folder.

## Use

Click the toolbar icon. Set the length with the slider or by typing a number
(6–64), toggle which character sets to draw from, hit **Generate**, then the
copy icon.

## How it generates

- Randomness comes from `crypto.getRandomValues()` — never `Math.random()`.
- Indices use rejection sampling, so no character is more likely than another
  (plain `% n` on a random byte would skew toward the low end of the alphabet).
- Every selected set is guaranteed at least one character, then the result is
  shuffled with Fisher–Yates so those characters aren't stuck in front.
- Look-alike characters (`l`, `I`, `O`, `0`, `1`) are left out of the sets.

## Files

| File | What it is |
|---|---|
| `manifest.json` | MV3 manifest — popup and icons only, zero permissions |
| `gen.js` | The generator. Pure, no DOM, so it can be tested in Node |
| `popup.html` / `popup.js` | The UI |
| `test.mjs` | Self-check: `node test.mjs` → `ok` |
| `icons/icon.svg` | Icon source; PNGs are rendered from it |

## Test

```sh
node test.mjs
```

Covers set coverage, the length/empty-selection errors, and that the sampling
stays uniform over 40k draws.

## License

GPL-3.0-or-later — see [LICENSE](LICENSE).

Copyright (C) 2026 juink
