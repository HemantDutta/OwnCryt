import { Router } from "express";
import multer from "multer";
import { config } from "../config.js";
import type { SubmissionService } from "../services/submissions/SubmissionService.js";
import { customDesignFieldsSchema, parseConsent } from "../validation.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: config.maxUploadMb * 1024 * 1024,
    files: 6,
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files can be uploaded."));
      return;
    }
    cb(null, true);
  },
});

export function customDesignsRouter(submissions: SubmissionService) {
  const router = Router();

  router.post("/", upload.array("images", 6), async (req, res) => {
    const files = Array.isArray(req.files) ? req.files : [];
    const body = {
      ...req.body,
      marketingConsent: parseConsent(req.body?.marketingConsent),
    };

    const parsed = customDesignFieldsSchema.safeParse(body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid request." });
      return;
    }

    try {
      const result = await submissions.recordCustomDesign(
        parsed.data,
        files.map((file) => ({
          originalName: file.originalname,
          mimeType: file.mimetype,
          buffer: file.buffer,
        })),
      );
      res.status(result.duplicate ? 200 : 201).json({ ok: true, duplicate: result.duplicate });
    } catch (err) {
      console.error("[custom-designs]", err instanceof Error ? err.message : err);
      res.status(503).json({ error: "We could not receive your design. Please try again." });
    }
  });

  return router;
}
