export type ProductStatus = "coming-soon" | "in-development";

export type ProductCategory =
  | "dresses"
  | "evening"
  | "party"
  | "minimal"
  | "statement";

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categories: ProductCategory[];
  descriptor: string;
  description: string;
  designDetails: string[];
  fabric?: string;
  indicativePriceInr: number;
  indicativePriceMaxInr?: number;
  currency: "INR";
  images: ProductImage[];
  tags: string[];
  status: ProductStatus;
  featured: boolean;
  sortIndex: number;
  createdAt: string;
}

export interface InterestPayload {
  productId: string;
  email: string;
  name?: string;
  sizePreference?: string;
  country?: string;
  marketingConsent: boolean;
}

export interface NewsletterPayload {
  email: string;
  firstName?: string;
  marketingConsent: boolean;
}
