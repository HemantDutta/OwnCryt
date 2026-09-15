import compression from "compression";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config, isProd } from "./config.js";
import { customDesignsRouter } from "./routes/customDesigns.js";
import { interestsRouter } from "./routes/interests.js";
import { newsletterRouter } from "./routes/newsletter.js";
import { createSubmissionService } from "./services/submissions/index.js";

const app = express();
const submissions = createSubmissionService();
const here = path.dirname(fileURLToPath(import.meta.url));

function resolveClientDist(): string | null {
  const candidates = [
    path.resolve(here, "../../client/dist"),
    path.resolve(process.cwd(), "../client/dist"),
    path.resolve(process.cwd(), "client/dist"),
  ];
  return candidates.find((dir) => existsSync(path.join(dir, "index.html"))) ?? null;
}

const clientDist = resolveClientDist();

app.disable("x-powered-by");
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
);
app.use(
  cors({
    origin: isProd ? config.clientOrigin : true,
    methods: ["GET", "POST", "OPTIONS"],
  }),
);
app.use(compression());
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true, limit: "32kb" }));

const submitLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 12,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many submissions. Please wait and try again." },
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, client: Boolean(clientDist) });
});

app.use("/api/interests", submitLimit, interestsRouter(submissions));
app.use("/api/newsletter", submitLimit, newsletterRouter(submissions));
app.use("/api/custom-designs", submitLimit, customDesignsRouter(submissions));

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Not found." });
});

if (clientDist) {
  app.use(
    express.static(clientDist, {
      index: false,
      setHeaders(res, filePath) {
        if (filePath.includes(`${path.sep}assets${path.sep}`)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else {
          res.setHeader("Cache-Control", "no-cache");
        }
      },
    }),
  );

  app.get(/.*/, (_req, res) => {
    res.setHeader("Cache-Control", "no-cache");
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    const message =
      err.message.includes("image") || err.message.includes("File")
        ? err.message
        : "Unexpected error.";
    res.status(400).json({ error: message });
  },
);

app.listen(config.port, "0.0.0.0", () => {
  console.info(
    `OwnCryt server listening on :${config.port} (${config.nodeEnv})`,
  );
  console.info(
    clientDist
      ? `Serving React app from ${clientDist}`
      : "React app not found (client/dist/index.html missing). GET / will 404 until the client is built.",
  );
});
