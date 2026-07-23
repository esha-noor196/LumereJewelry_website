import ring1 from "@/assets/j-ring-1.jpg";
import ring2 from "@/assets/j-ring-2.jpg";
import necklace1 from "@/assets/j-necklace-1.jpg";
import necklace2 from "@/assets/j-necklace-2.jpg";
import earrings1 from "@/assets/j-earrings-1.jpg";
import earrings2 from "@/assets/j-earrings-2.jpg";
import bracelet1 from "@/assets/j-bracelet-1.jpg";
import bracelet2 from "@/assets/j-bracelet-2.jpg";

export type ProductCategory = "rings" | "necklaces" | "earrings" | "bracelets";

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage: string;
  category: ProductCategory;
  material: string;
  collection: string;
  colors: string[];
  sizes: string[];
  description: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  onSale?: boolean;
};

export const products: Product[] = [
  {
    id: "aurora-solitaire",
    name: "Aurora Solitaire Ring",
    price: 1450,
    image: ring1,
    hoverImage: ring2,
    category: "rings",
    material: "18k Yellow Gold · Diamond",
    collection: "Bridal",
    colors: ["Yellow Gold", "White Gold"],
    sizes: ["48", "50", "52", "54", "56"],
    description:
      "A brilliant-cut solitaire diamond set in a hand-polished 18k gold band. Timeless, minimal, made to be worn every day.",
    isNew: true,
    isBestSeller: true,
  },
  {
    id: "eternité-band",
    name: "Éternité Diamond Band",
    price: 2280,
    originalPrice: 2650,
    image: ring2,
    hoverImage: ring1,
    category: "rings",
    material: "18k Gold · Pavé Diamonds",
    collection: "Bridal",
    colors: ["Yellow Gold", "Rose Gold"],
    sizes: ["48", "50", "52", "54"],
    description:
      "An eternity band set with 0.75ct of ethically-sourced pavé diamonds. Every stone hand-set in our Antwerp atelier.",
    onSale: true,
    isBestSeller: true,
  },
  {
    id: "lune-pendant",
    name: "Lune Pendant Necklace",
    price: 385,
    image: necklace1,
    hoverImage: necklace2,
    category: "necklaces",
    material: "14k Gold Vermeil · Mother of Pearl",
    collection: "Everyday Luxury",
    colors: ["Gold", "Silver"],
    sizes: ["40cm", "45cm"],
    description:
      "A softly-lit mother of pearl cabochon suspended on a delicate cable chain. Made to layer, made to last.",
    isNew: true,
  },
  {
    id: "cascade-layered",
    name: "Cascade Layered Necklace",
    price: 520,
    image: necklace2,
    hoverImage: necklace1,
    category: "necklaces",
    material: "18k Gold Plated Vermeil",
    collection: "Fine Jewelry",
    colors: ["Yellow Gold"],
    sizes: ["38-48cm adjustable"],
    description:
      "Three graduated chains layered on a single clasp. The effect of a curated stack without the tangle.",
    isBestSeller: true,
  },
  {
    id: "pearl-hoop",
    name: "Perla Pearl Hoop Earrings",
    price: 295,
    image: earrings1,
    hoverImage: earrings2,
    category: "earrings",
    material: "14k Gold · Freshwater Pearl",
    collection: "Everyday Luxury",
    colors: ["Gold"],
    sizes: ["One Size"],
    description:
      "Polished 20mm hoops finished with a single freshwater pearl. Featherlight and made to be worn daily.",
    isNew: true,
    isBestSeller: true,
  },
  {
    id: "veil-drop-earrings",
    name: "Veil Diamond Drop Earrings",
    price: 1180,
    originalPrice: 1380,
    image: earrings2,
    hoverImage: earrings1,
    category: "earrings",
    material: "18k Gold · Pear-Cut Diamond",
    collection: "Limited Edition",
    colors: ["Yellow Gold", "White Gold"],
    sizes: ["One Size"],
    description:
      "Pear-cut diamond drops framed in a halo of pavé. A statement piece for evenings that matter.",
    onSale: true,
  },
  {
    id: "seine-chain",
    name: "Seine Delicate Chain Bracelet",
    price: 245,
    image: bracelet1,
    hoverImage: bracelet2,
    category: "bracelets",
    material: "14k Gold Fill",
    collection: "Everyday Luxury",
    colors: ["Yellow Gold", "Rose Gold"],
    sizes: ["16cm", "18cm"],
    description:
      "A fine cable chain with a subtle drop charm — cut to sit weightlessly on the wrist.",
    isNew: true,
  },
  {
    id: "tennis-diamond",
    name: "Diamant Tennis Bracelet",
    price: 3450,
    image: bracelet2,
    hoverImage: bracelet1,
    category: "bracelets",
    material: "18k Gold · 3.2ct Diamonds",
    collection: "Fine Jewelry",
    colors: ["Yellow Gold", "White Gold"],
    sizes: ["17cm", "18cm", "19cm"],
    description:
      "A continuous line of brilliant-cut diamonds, each individually four-prong set. The definitive tennis bracelet.",
    isBestSeller: true,
  },
];

export const categories: { key: ProductCategory; label: string }[] = [
  { key: "rings", label: "Rings" },
  { key: "necklaces", label: "Necklaces" },
  { key: "earrings", label: "Earrings" },
  { key: "bracelets", label: "Bracelets" },
];

export const collections = [
  {
    slug: "bridal",
    name: "Bridal",
    tagline: "Vows made in gold and light.",
    count: 18,
  },
  {
    slug: "everyday-luxury",
    name: "Everyday Luxury",
    tagline: "Fine pieces for the way you live now.",
    count: 32,
  },
  {
    slug: "fine-jewelry",
    name: "Fine Jewelry",
    tagline: "Investment pieces, hand-set in our atelier.",
    count: 24,
  },
  {
    slug: "limited-edition",
    name: "Limited Edition",
    tagline: "Numbered pieces, released once a season.",
    count: 8,
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
