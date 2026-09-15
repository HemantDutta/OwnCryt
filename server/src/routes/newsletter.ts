import { Router } from "express";
import type { SubmissionService } from "../services/submissions/SubmissionService.js";
import { newsletterSchema } from "../validation.js";

export function newsletterRouter(submissions: SubmissionService) {
  const router = Router();

  router.post("/", async (req, res) => {
    const parsed = newsletterSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid request." });
      return;
    }

    try {
      const result = await submissions.recordNewsletter(parsed.data);
      res.status(result.duplicate ? 200 : 201).json({ ok: true, duplicate: result.duplicate });
    } catch (err) {
      console.error("[newsletter]", err instanceof Error ? err.message : err);
      res.status(503).json({ error: "We could not add you to the list. Please try again." });
    }
  });

  return router;
}
