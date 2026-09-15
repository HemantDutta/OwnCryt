export interface InterestInput {
  productId: string;
  email: string;
  name?: string;
  sizePreference?: string;
  country?: string;
  marketingConsent: boolean;
}

export interface NewsletterInput {
  email: string;
  firstName?: string;
  marketingConsent: boolean;
}

export interface CustomDesignInput {
  email: string;
  name: string;
  phone?: string;
  description: string;
  occasion?: string;
  silhouette?: string;
  color?: string;
  fabric?: string;
  budget?: string;
  size?: string;
  country?: string;
  marketingConsent: boolean;
}

export type RecordResult = { duplicate: boolean };

export interface UploadedImage {
  originalName: string;
  mimeType: string;
  buffer: Buffer;
}

export interface SubmissionService {
  recordInterest(input: InterestInput): Promise<RecordResult>;
  recordNewsletter(input: NewsletterInput): Promise<RecordResult>;
  recordCustomDesign(
    input: CustomDesignInput,
    images: UploadedImage[],
  ): Promise<RecordResult>;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
