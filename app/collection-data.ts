export type CollectionProduct = {
  id: string;
  name: string;
  category: "Automatic" | "Chronograph" | "Leather" | "Minimal" | "Field";
  wearer: "Men" | "Women";
  size: string;
  movement: string;
  price: number;
  image: string;
  badge?: string;
  tone: string;
};

const models = [
  "Meridian", "Morrow", "Linea", "Atelier", "Nocturne",
  "Stillwater", "Solstice", "Archive", "Touring", "Aster",
  "Northstar", "Drift", "Harbour", "Contour", "Crescent",
  "Waypoint", "Monument", "Aperture", "Horizon", "Vale",
];

const editions = ["No. 01", "Studio", "Reserve"];
const categories: CollectionProduct["category"][] = ["Automatic", "Chronograph", "Leather", "Minimal", "Field"];
const imagePools: Record<CollectionProduct["category"], string[]> = {
  Automatic: [
    "/images/macro-dark.jpg", "/images/black-watch.jpg",
    "/images/watch-collection.jpg", "/images/hero-watch.jpg",
    "/images/generic-02.jpg", "/images/generic-05.jpg",
    "/images/generic-14.jpg", "/images/generic-15.jpg",
    "/images/generic-16.jpg", "/images/generic-25.jpg",
    "/images/generic-30.jpg", "/images/generic-31.jpg",
  ],
  Chronograph: [
    "/images/chrono-watch.jpg", "/images/car-watch-1.jpg",
    "/images/car-watch-2.jpg", "/images/car-watch-4.jpg",
    "/images/generic-11.jpg", "/images/generic-12.jpg",
    "/images/generic-13.jpg", "/images/generic-22.jpg",
    "/images/generic-24.jpg", "/images/generic-28.jpg",
    "/images/generic-32.jpg", "/images/leather-09.jpg",
  ],
  Leather: [
    "/images/vintage-leather.jpg", "/images/leather-watch.jpg",
    "/images/leather-01.jpg", "/images/leather-02.jpg",
    "/images/leather-03.jpg", "/images/leather-04.jpg",
    "/images/leather-05.jpg", "/images/leather-06.jpg",
    "/images/leather-07.jpg", "/images/leather-08.jpg",
    "/images/leather-10.jpg", "/images/generic-29.jpg",
  ],
  Minimal: [
    "/images/silver-watch.jpg", "/images/minimal-watch.jpg",
    "/images/womens-watch.jpg", "/images/wrist-lifestyle.jpg",
    "/images/generic-03.jpg", "/images/generic-04.jpg",
    "/images/generic-06.jpg", "/images/generic-09.jpg",
    "/images/generic-17.jpg", "/images/generic-18.jpg",
    "/images/generic-20.jpg", "/images/generic-27.jpg",
  ],
  Field: [
    "/images/tech-flatlay.jpg", "/images/editorial-watch.jpg", "/images/car-watch-3.jpg",
    "/images/mens-watch.jpg", "/images/generic-01.jpg",
    "/images/generic-07.jpg", "/images/generic-08.jpg",
    "/images/generic-10.jpg", "/images/generic-19.jpg",
    "/images/generic-21.jpg", "/images/generic-23.jpg",
    "/images/generic-26.jpg",
  ],
};
const wearerPools: Record<CollectionProduct["category"], CollectionProduct["wearer"][]> = {
  Automatic: ["Men", "Men", "Women", "Men", "Women", "Women", "Men", "Women", "Men", "Women", "Men", "Men"],
  Chronograph: ["Men", "Men", "Men", "Women", "Men", "Men", "Men", "Men", "Women", "Men", "Women", "Women"],
  Leather: ["Women", "Men", "Women", "Men", "Women", "Women", "Women", "Women", "Women", "Women", "Men", "Men"],
  Minimal: ["Women", "Women", "Women", "Men", "Women", "Women", "Women", "Women", "Men", "Men", "Women", "Men"],
  Field: ["Men", "Men", "Men", "Men", "Men", "Women", "Women", "Women", "Men", "Women", "Men", "Women"],
};
const tones = ["#171717", "#72513a", "#b69b6b", "#385064", "#6b7563", "#c6b7a1"];

export const collectionProducts: CollectionProduct[] = Array.from({ length: 60 }, (_, index) => {
  const category = categories[index % categories.length];
  const model = models[index % models.length];
  const edition = editions[Math.floor(index / models.length)];
  const movement = category === "Automatic" ? "Automatic" : category === "Chronograph" ? "Quartz Chronograph" : "Japanese Quartz";
  const categoryImageIndex = Math.floor(index / categories.length);
  const wearer = wearerPools[category][categoryImageIndex];
  return {
    id: `aev-${String(index + 1).padStart(3, "0")}`,
    name: `${model} ${edition}`,
    category,
    wearer,
    size: `${wearer === "Women" ? 28 + ((index * 2) % 10) : 38 + (index % 5)} MM`,
    movement,
    price: 7900 + ((index * 1375) % 17600),
    image: imagePools[category][categoryImageIndex],
    badge: index % 11 === 0 ? "Limited" : index % 7 === 0 ? "New" : index % 9 === 0 ? "Bestseller" : undefined,
    tone: tones[index % tones.length],
  };
});
