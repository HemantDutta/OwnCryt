import { z } from "zod";

const email = z
  .string()
  .trim()
  .min(3)
  .max(254)
  .email("Enter a valid email address.");

const short = z.string().trim().max(120).optional();

export const interestSchema = z.object({
  productId: z.string().trim().min(1).max(80),
  email,
  name: short,
  sizePreference: short,
  country: z.string().trim().max(56).optional(),
  marketingConsent: z.boolean(),
});

export const newsletterSchema = z.object({
  email,
  firstName: short,
  marketingConsent: z
    .boolean()
    .refine((value) => value === true, {
      message: "Consent is required to join the list.",
    }),
});

export const customDesignFieldsSchema = z.object({
  email,
  name: z.string().trim().min(1).max(120),
  phone: short,
  description: z.string().trim().min(8).max(4000),
  occasion: short,
  silhouette: short,
  color: short,
  fabric: short,
  budget: short,
  size: short,
  country: z.string().trim().max(56).optional(),
  marketingConsent: z
    .boolean()
    .refine((value) => value === true, {
      message: "Consent is required to send this inquiry.",
    }),
});

export function parseConsent(value: unknown): boolean {
  return value === true || value === "true" || value === "on" || value === "1";
}
