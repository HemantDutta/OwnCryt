import { hasDuplicate, remember } from "../../store/submissionStore.js";
import type {
  CustomDesignInput,
  InterestInput,
  NewsletterInput,
  RecordResult,
  SubmissionService,
  UploadedImage,
} from "./SubmissionService.js";
import { normalizeEmail } from "./SubmissionService.js";

function safeLog(kind: string, meta: Record<string, string | number | boolean>) {
  console.info(`[submissions:mock] ${kind}`, meta);
}

export const mockSubmissionService: SubmissionService = {
  async recordInterest(input: InterestInput): Promise<RecordResult> {
    const email = normalizeEmail(input.email);
    if (await hasDuplicate("interest", email, input.productId)) {
      return { duplicate: true };
    }
    safeLog("interest", {
      productId: input.productId,
      country: input.country ?? "",
      consent: input.marketingConsent,
      hasName: Boolean(input.name),
    });
    await remember("interest", email, input.productId);
    return { duplicate: false };
  },

  async recordNewsletter(input: NewsletterInput): Promise<RecordResult> {
    const email = normalizeEmail(input.email);
    if (await hasDuplicate("newsletter", email)) {
      return { duplicate: true };
    }
    safeLog("newsletter", {
      consent: input.marketingConsent,
      hasFirstName: Boolean(input.firstName),
    });
    await remember("newsletter", email);
    return { duplicate: false };
  },

  async recordCustomDesign(
    input: CustomDesignInput,
    images: UploadedImage[],
  ): Promise<RecordResult> {
    safeLog("custom-design", {
      fileCount: images.length,
      occasion: input.occasion ?? "",
      country: input.country ?? "",
      consent: input.marketingConsent,
    });
    return { duplicate: false };
  },
};
