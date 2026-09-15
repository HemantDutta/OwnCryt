import { randomUUID } from "node:crypto";
import { getSupabase } from "../../lib/supabase.js";
import type {
  CustomDesignInput,
  InterestInput,
  NewsletterInput,
  RecordResult,
  SubmissionService,
  UploadedImage,
} from "./SubmissionService.js";
import { normalizeEmail } from "./SubmissionService.js";

function isUniqueViolation(error: { code?: string } | null): boolean {
  return error?.code === "23505";
}

function safeFileName(name: string): string {
  return name.replace(/[^\w.\-]+/g, "_").slice(0, 80) || "image";
}

export const supabaseSubmissionService: SubmissionService = {
  async recordInterest(input: InterestInput): Promise<RecordResult> {
    const supabase = getSupabase();
    const { error } = await supabase.from("product_interests").insert({
      product_id: input.productId,
      email: normalizeEmail(input.email),
      name: input.name || null,
      size_preference: input.sizePreference || null,
      country: input.country || null,
      marketing_consent: input.marketingConsent,
    });
    if (isUniqueViolation(error)) return { duplicate: true };
    if (error) {
      console.error("[supabase] product_interests", error.code, error.message);
      throw error;
    }
    console.info("[supabase] interest saved", input.productId);
    return { duplicate: false };
  },

  async recordNewsletter(input: NewsletterInput): Promise<RecordResult> {
    const supabase = getSupabase();
    const { error } = await supabase.from("newsletter_signups").insert({
      email: normalizeEmail(input.email),
      first_name: input.firstName || null,
      marketing_consent: input.marketingConsent,
    });
    if (isUniqueViolation(error)) return { duplicate: true };
    if (error) {
      console.error("[supabase] newsletter_signups", error.code, error.message);
      throw error;
    }
    console.info("[supabase] newsletter saved");
    return { duplicate: false };
  },

  async recordCustomDesign(
    input: CustomDesignInput,
    images: UploadedImage[],
  ): Promise<RecordResult> {
    const supabase = getSupabase();
    const id = randomUUID();
    const imagePaths: string[] = [];

    for (const image of images) {
      const path = `${id}/${safeFileName(image.originalName)}`;
      const { error } = await supabase.storage
        .from("custom-designs")
        .upload(path, image.buffer, {
          contentType: image.mimeType,
          upsert: false,
        });
      if (error) {
        console.error("[supabase] storage", error.message);
        throw error;
      }
      imagePaths.push(path);
    }

    const { error } = await supabase.from("custom_designs").insert({
      id,
      email: normalizeEmail(input.email),
      name: input.name,
      phone: input.phone || null,
      description: input.description,
      occasion: input.occasion || null,
      silhouette: input.silhouette || null,
      color: input.color || null,
      fabric: input.fabric || null,
      budget: input.budget || null,
      size: input.size || null,
      country: input.country || null,
      marketing_consent: input.marketingConsent,
      image_paths: imagePaths,
    });
    if (error) {
      console.error("[supabase] custom_designs", error.code, error.message);
      throw error;
    }
    console.info("[supabase] custom design saved");
    return { duplicate: false };
  },
};
