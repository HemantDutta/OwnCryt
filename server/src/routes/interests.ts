import { Router } from "express";
import type { SubmissionService } from "../services/submissions/SubmissionService.js";
import { interestSchema } from "../validation.js";

export function interestsRouter(submissions: SubmissionService) {
  const router = Router();

  router.post("/", async (req, res) => {
    const parsed = interestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid request." });
      return;
    }

    if (!parsed.data.marketingConsent) {
      res.status(400).json({ error: "Consent is required to receive updates." });
      return;
    }

    try {
      const result = await submissions.recordInterest(parsed.data);
      res.status(result.duplicate ? 200 : 201).json({ ok: true, duplicate: result.duplicate });
    } catch (err) {
      console.error("[interests]", err instanceof Error ? err.message : err);
      res.status(503).json({ error: "We could not save your interest. Please try again." });
    }
  });

  return router;
}
