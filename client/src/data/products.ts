import type { Product, ProductCategory } from "../types/product";

const img = (
  file: string,
  alt: string,
  width = 1200,
  height = 1600,
): Product["images"][number] => ({
  src: `/images/products/${file}`,
  alt,
  width,
  height,
});

export const products: Product[] = [
  {
    id: "nocturne-dress",
    slug: "nocturne-dress",
    name: "The Nocturne Dress",
    category: "evening",
    categories: ["dresses", "evening", "statement"],
    descriptor: "A sleek black evening silhouette",
    description:
      "Cut close through the body and released into a quiet, floor-skimming line. Nocturne is imagined for rooms that dim the lights and raise the conversation — a black dress with the presence of something far more expensive.",
    designDetails: [
      "Column silhouette with a softly squared neckline",
      "Invisible back zip and clean-finished hem",
      "Designed to sit at a mid-heel length",
    ],
    fabric: "Proposed in a fluid crepe with a matte, light-absorbing finish.",
    indicativePriceInr: 4990,
    indicativePriceMaxInr: 6490,
    currency: "INR",
    images: [
      img(
        "nocturne.svg",
        "Editorial study of The Nocturne Dress, a sleek black evening column",
      ),
      img(
        "nocturne-detail.svg",
        "Close study of The Nocturne Dress neckline and drape",
      ),
    ],
    tags: ["black", "evening", "column", "crepe"],
    status: "in-development",
    featured: true,
    sortIndex: 1,
    createdAt: "2026-08-01",
  },
  {
    id: "solenne-dress",
    slug: "solenne-dress",
    name: "The Solenne Dress",
    category: "minimal",
    categories: ["dresses", "minimal", "evening"],
    descriptor: "An elegant sculpted cream dress",
    description:
      "Solenne is built from calm volume — a cream sculpted bodice that holds its shape, then falls with intention. It is the dress for daylight ceremonies and late tables alike.",
    designDetails: [
      "Sculpted bodice with a clean, strapless line",
      "Controlled A-line skirt",
      "Internal structure proposed, not yet sampled",
    ],
    fabric: "Proposed in a dense ivory faille.",
    indicativePriceInr: 5490,
    indicativePriceMaxInr: 7290,
    currency: "INR",
    images: [
      img(
        "solenne.svg",
        "Editorial study of The Solenne Dress in sculpted cream",
      ),
      img("solenne-detail.svg", "Detail of The Solenne Dress sculpted bodice"),
    ],
    tags: ["cream", "ivory", "sculpted", "occasion"],
    status: "coming-soon",
    featured: true,
    sortIndex: 2,
    createdAt: "2026-08-04",
  },
  {
    id: "sienna-slip",
    slug: "sienna-slip",
    name: "The Sienna Slip",
    category: "minimal",
    categories: ["dresses", "minimal"],
    descriptor: "A minimal satin-inspired silhouette",
    description:
      "A bias-minded slip with almost nothing extra. Sienna is the argument for fewer seams, better drape, and a colour that looks like candlelight on skin.",
    designDetails: [
      "V-neck slip with adjustable straps",
      "Bias-inspired fall through the hip",
      "Ankle length on an average frame",
    ],
    fabric: "Proposed in a satin-backed crepe.",
    indicativePriceInr: 3490,
    indicativePriceMaxInr: 4490,
    currency: "INR",
    images: [
      img("sienna.svg", "Editorial study of The Sienna Slip in champagne satin"),
      img("sienna-detail.svg", "Drape detail of The Sienna Slip"),
    ],
    tags: ["slip", "satin", "minimal", "champagne"],
    status: "in-development",
    featured: true,
    sortIndex: 3,
    createdAt: "2026-08-08",
  },
  {
    id: "afterglow-dress",
    slug: "afterglow-dress",
    name: "The Afterglow Dress",
    category: "party",
    categories: ["dresses", "party", "evening", "statement"],
    descriptor: "A statement evening design",
    description:
      "Afterglow is the dress you remember in the lift mirror. A muted burgundy body, open at the back, made for evenings that run longer than planned.",
    designDetails: [
      "Fitted torso with a low, finished back",
      "Slight flare from the knee",
      "Statement without sequin noise",
    ],
    fabric: "Proposed in a stretch crepe with a dry hand.",
    indicativePriceInr: 5290,
    indicativePriceMaxInr: 6890,
    currency: "INR",
    images: [
      img(
        "afterglow.svg",
        "Editorial study of The Afterglow Dress in muted burgundy",
      ),
      img("afterglow-detail.svg", "Back line of The Afterglow Dress"),
    ],
    tags: ["burgundy", "party", "evening", "statement"],
    status: "coming-soon",
    featured: true,
    sortIndex: 4,
    createdAt: "2026-08-12",
  },
  {
    id: "muse-dress",
    slug: "muse-dress",
    name: "The Muse Dress",
    category: "minimal",
    categories: ["dresses", "minimal"],
    descriptor: "A modern fitted silhouette",
    description:
      "Muse is a working luxury: a fitted modern line that can leave the office and keep the dinner. Tailored through the waist, unfussy at the neck.",
    designDetails: [
      "Short sleeve, jewel neck",
      "Darted waist and pencil skirt",
      "Knee-to-midi length",
    ],
    fabric: "Proposed in a compact suiting crepe.",
    indicativePriceInr: 4290,
    indicativePriceMaxInr: 5490,
    currency: "INR",
    images: [
      img("muse.svg", "Editorial study of The Muse Dress, a modern fitted line"),
      img("muse-detail.svg", "Waist tailoring on The Muse Dress"),
    ],
    tags: ["fitted", "modern", "work", "charcoal"],
    status: "in-development",
    featured: true,
    sortIndex: 5,
    createdAt: "2026-08-16",
  },
  {
    id: "elan-dress",
    slug: "elan-dress",
    name: "The Élan Dress",
    category: "evening",
    categories: ["dresses", "evening", "party"],
    descriptor: "A refined occasion piece",
    description:
      "Élan is for the invitation you actually want to accept. Soft structure, a considered neckline, and an easy skirt that still photographs like couture adjacent.",
    designDetails: [
      "Portrait neckline",
      "Softly gathered skirt",
      "Hidden pockets, if sampling allows",
    ],
    fabric: "Proposed in a fine wool-blend crepe.",
    indicativePriceInr: 5690,
    indicativePriceMaxInr: 7490,
    currency: "INR",
    images: [
      img("elan.svg", "Editorial study of The Élan Dress, a refined occasion piece"),
      img("elan-detail.svg", "Portrait neckline of The Élan Dress"),
    ],
    tags: ["occasion", "portrait", "refined"],
    status: "coming-soon",
    featured: true,
    sortIndex: 6,
    createdAt: "2026-08-20",
  },
  {
    id: "riviera-dress",
    slug: "riviera-dress",
    name: "The Riviera Dress",
    category: "minimal",
    categories: ["dresses", "minimal"],
    descriptor: "An effortless vacation-inspired design",
    description:
      "Riviera is heat, shade, and movement. A vacation-minded dress that still belongs in a city — linen-inspired, unlined in spirit, never sloppy.",
    designDetails: [
      "Halter neck with an open back",
      "Easy midi skirt with a high slit",
      "Designed for warm weather drape",
    ],
    fabric: "Proposed in a washed linen-blend.",
    indicativePriceInr: 3890,
    indicativePriceMaxInr: 4990,
    currency: "INR",
    images: [
      img(
        "riviera.svg",
        "Editorial study of The Riviera Dress, vacation-inspired linen",
      ),
      img("riviera-detail.svg", "Halter detail of The Riviera Dress"),
    ],
    tags: ["vacation", "linen", "halter", "midi"],
    status: "in-development",
    featured: true,
    sortIndex: 7,
    createdAt: "2026-08-24",
  },
  {
    id: "eclipse-dress",
    slug: "eclipse-dress",
    name: "The Eclipse Dress",
    category: "statement",
    categories: ["dresses", "evening", "statement"],
    descriptor: "A dramatic contemporary evening look",
    description:
      "Eclipse is architecture after dark — a dramatic contemporary evening look with volume where it counts and stillness everywhere else.",
    designDetails: [
      "Asymmetric drape across the torso",
      "Fuller skirt with a controlled train",
      "High neck, open shoulder",
    ],
    fabric: "Proposed in a silk-like faille.",
    indicativePriceInr: 6990,
    indicativePriceMaxInr: 8990,
    currency: "INR",
    images: [
      img(
        "eclipse.svg",
        "Editorial study of The Eclipse Dress, a dramatic evening look",
      ),
      img("eclipse-detail.svg", "Asymmetric drape on The Eclipse Dress"),
    ],
    tags: ["dramatic", "evening", "volume", "black"],
    status: "coming-soon",
    featured: true,
    sortIndex: 8,
    createdAt: "2026-08-28",
  },
  {
    id: "aurelia-dress",
    slug: "aurelia-dress",
    name: "The Aurelia Dress",
    category: "party",
    categories: ["dresses", "party", "statement"],
    descriptor: "A warm metallic occasion line",
    description:
      "Aurelia takes the idea of a party dress and lowers the volume. Warm bronze light, a straight fall, and hardware kept to a whisper.",
    designDetails: [
      "Straight column with a scooped neck",
      "Subtle metallic yarn in the proposed cloth",
      "Ankle length",
    ],
    fabric: "Proposed in a bronze-shot crepe.",
    indicativePriceInr: 4790,
    indicativePriceMaxInr: 6290,
    currency: "INR",
    images: [
      img("aurelia.svg", "Editorial study of The Aurelia Dress in warm bronze"),
      img("aurelia-detail.svg", "Metallic drape of The Aurelia Dress"),
    ],
    tags: ["bronze", "party", "column", "metallic"],
    status: "in-development",
    featured: false,
    sortIndex: 9,
    createdAt: "2026-09-01",
  },
  {
    id: "velvet-hour-dress",
    slug: "velvet-hour-dress",
    name: "The Velvet Hour Dress",
    category: "evening",
    categories: ["dresses", "evening", "statement"],
    descriptor: "A plum evening dress with quiet drama",
    description:
      "Named for the last light that still feels like a secret. Deep plum, long sleeve, a neckline that frames rather than performs.",
    designDetails: [
      "Long sleeve with a clean cuff",
      "Gentle boat neck",
      "Bias panel through the skirt",
    ],
    fabric: "Proposed in a silk-touch velvet alternative.",
    indicativePriceInr: 5890,
    indicativePriceMaxInr: 7690,
    currency: "INR",
    images: [
      img(
        "velvet-hour.svg",
        "Editorial study of The Velvet Hour Dress in deep plum",
      ),
      img("velvet-hour-detail.svg", "Sleeve and neckline of The Velvet Hour Dress"),
    ],
    tags: ["plum", "velvet", "evening", "long-sleeve"],
    status: "coming-soon",
    featured: false,
    sortIndex: 10,
    createdAt: "2026-09-04",
  },
  {
    id: "calypso-dress",
    slug: "calypso-dress",
    name: "The Calypso Dress",
    category: "party",
    categories: ["dresses", "party"],
    descriptor: "A terracotta party silhouette",
    description:
      "Calypso is earth, not neon. A terracotta party dress with movement in the skirt and a bodice that stays put when you dance.",
    designDetails: [
      "Fitted bodice, full skirt",
      "Thin straps",
      "Tea length",
    ],
    fabric: "Proposed in a cotton-silk poplin.",
    indicativePriceInr: 4190,
    indicativePriceMaxInr: 5390,
    currency: "INR",
    images: [
      img("calypso.svg", "Editorial study of The Calypso Dress in terracotta"),
      img("calypso-detail.svg", "Skirt movement of The Calypso Dress"),
    ],
    tags: ["terracotta", "party", "tea-length"],
    status: "in-development",
    featured: false,
    sortIndex: 11,
    createdAt: "2026-09-08",
  },
  {
    id: "lumiere-dress",
    slug: "lumiere-dress",
    name: "The Lumière Dress",
    category: "minimal",
    categories: ["dresses", "minimal", "evening"],
    descriptor: "A blush dress for late light",
    description:
      "Lumière is the pale dress that still has a point of view. Blush, not bridal — a column for dinners that start after the heat breaks.",
    designDetails: [
      "One-shoulder column",
      "Straight skirt with a narrow vent",
      "Unadorned surface",
    ],
    fabric: "Proposed in a matte stretch crepe.",
    indicativePriceInr: 4590,
    indicativePriceMaxInr: 5990,
    currency: "INR",
    images: [
      img("lumiere.svg", "Editorial study of The Lumière Dress in pale blush"),
      img("lumiere-detail.svg", "One-shoulder line of The Lumière Dress"),
    ],
    tags: ["blush", "column", "one-shoulder", "minimal"],
    status: "coming-soon",
    featured: false,
    sortIndex: 12,
    createdAt: "2026-09-12",
  },
];

export const featuredProducts = products
  .filter((p) => p.featured)
  .sort((a, b) => a.sortIndex - b.sortIndex);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export type SortKey = "featured" | "newest" | "price-asc" | "price-desc";

export function filterProducts(
  list: Product[],
  category: ProductCategory | "all",
): Product[] {
  if (category === "all") return list;
  return list.filter((p) => p.categories.includes(category));
}

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const copy = [...list];
  switch (sort) {
    case "newest":
      return copy.sort(
        (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
      );
    case "price-asc":
      return copy.sort((a, b) => a.indicativePriceInr - b.indicativePriceInr);
    case "price-desc":
      return copy.sort((a, b) => b.indicativePriceInr - a.indicativePriceInr);
    default:
      return copy.sort((a, b) => a.sortIndex - b.sortIndex);
  }
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    const hay = [
      p.name,
      p.descriptor,
      p.description,
      p.category,
      ...p.categories,
      ...p.tags,
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}
