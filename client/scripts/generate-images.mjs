import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outProducts = path.join(root, "public", "images", "products");
const outScenes = path.join(root, "public", "images");

fs.mkdirSync(outProducts, { recursive: true });
fs.mkdirSync(outScenes, { recursive: true });

const dressPath =
  "M300 210 C300 168 338 140 390 140 C442 140 480 168 480 210 L492 390 C498 430 486 448 510 470 L560 720 C566 748 548 760 528 760 L500 760 L508 980 C510 1010 498 1040 390 1040 C282 1040 270 1010 272 980 L280 760 L252 760 C232 760 214 748 220 720 L270 470 C294 448 282 430 288 390 Z";

const slipPath =
  "M318 200 C330 168 360 150 390 150 C420 150 450 168 462 200 L470 250 L500 760 L508 1000 C508 1030 470 1048 390 1048 C310 1048 272 1030 272 1000 L280 760 L310 250 Z";

function noise(id) {
  return `
    <filter id="${id}" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" result="n"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0.18"/>
      </feComponentTransfer>
      <feBlend in="SourceGraphic" mode="multiply"/>
    </filter>`;
}

function productSvg({ bg, mid, ink, pathD, crop = false }) {
  const view = crop ? "220 160 340 420" : "0 0 780 1200";
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${view}" width="1200" height="1600" role="img">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg}"/>
      <stop offset="55%" stop-color="${mid}"/>
      <stop offset="100%" stop-color="${bg}"/>
    </linearGradient>
    ${noise("grain")}
    <radialGradient id="spot" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.12"/>
    </radialGradient>
  </defs>
  <rect width="780" height="1200" fill="url(#g)"/>
  <rect width="780" height="1200" fill="url(#spot)"/>
  <rect width="780" height="1200" filter="url(#grain)" fill="${mid}"/>
  <g fill="${ink}" fill-opacity="0.92" transform="translate(0,40)">
    <path d="${pathD}"/>
  </g>
</svg>`;
}

function sceneSvg({ bg, mid, ink, wide = false }) {
  const w = wide ? 1600 : 1200;
  const h = wide ? 900 : 1600;
  const vb = wide ? "0 0 1600 900" : "0 0 780 1200";
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg}"/>
      <stop offset="100%" stop-color="${mid}"/>
    </linearGradient>
    ${noise("grain")}
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" filter="url(#grain)" fill="${mid}" opacity="0.5"/>
  <g fill="${ink}" opacity="0.88" transform="${wide ? "translate(520,-80) scale(1.05)" : "translate(0,20)"}">
    <path d="${dressPath}"/>
  </g>
</svg>`;
}

const studies = [
  { file: "nocturne", bg: "#141210", mid: "#2a2420", ink: "#0b0a09", path: dressPath },
  { file: "solenne", bg: "#f3eadc", mid: "#e4d3b8", ink: "#d7c4a4", path: dressPath },
  { file: "sienna", bg: "#d9c2a6", mid: "#c4a07c", ink: "#b08962", path: slipPath },
  { file: "afterglow", bg: "#5a2430", mid: "#7a3040", ink: "#3d1620", path: dressPath },
  { file: "muse", bg: "#2c2a28", mid: "#3f3b37", ink: "#1b1917", path: dressPath },
  { file: "elan", bg: "#eee6da", mid: "#d8cbb8", ink: "#c4b39a", path: dressPath },
  { file: "riviera", bg: "#cfdcd6", mid: "#adc2b8", ink: "#8aa397", path: slipPath },
  { file: "eclipse", bg: "#10131a", mid: "#1c2430", ink: "#07090d", path: dressPath },
  { file: "aurelia", bg: "#c4a36a", mid: "#a9844b", ink: "#8c6a36", path: dressPath },
  { file: "velvet-hour", bg: "#3a1c2e", mid: "#542640", ink: "#24121c", path: dressPath },
  { file: "calypso", bg: "#b56848", mid: "#9a4f32", ink: "#7a3a24", path: dressPath },
  { file: "lumiere", bg: "#ead9d3", mid: "#d9c0b8", ink: "#c9a9a0", path: slipPath },
];

for (const s of studies) {
  fs.writeFileSync(
    path.join(outProducts, `${s.file}.svg`),
    productSvg({ bg: s.bg, mid: s.mid, ink: s.ink, pathD: s.path }),
  );
  fs.writeFileSync(
    path.join(outProducts, `${s.file}-detail.svg`),
    productSvg({
      bg: s.bg,
      mid: s.mid,
      ink: s.ink,
      pathD: s.path,
      crop: true,
    }),
  );
}

fs.writeFileSync(
  path.join(outScenes, "hero.svg"),
  sceneSvg({ bg: "#1a1412", mid: "#3d2b24", ink: "#0e0c0b", wide: true }),
);
fs.writeFileSync(
  path.join(outScenes, "custom-studio.svg"),
  sceneSvg({ bg: "#efe7dc", mid: "#d9cbb8", ink: "#6b2d3c", wide: false }),
);
fs.writeFileSync(
  path.join(outScenes, "about.svg"),
  sceneSvg({ bg: "#f6f1ea", mid: "#e4d9c8", ink: "#3d2b24", wide: true }),
);
fs.writeFileSync(
  path.join(outScenes, "editorial.svg"),
  sceneSvg({ bg: "#6b2d3c", mid: "#3d2b24", ink: "#1a1014", wide: true }),
);

console.log("Wrote editorial studies to public/images");
