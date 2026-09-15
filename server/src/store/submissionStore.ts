import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data", "submissions");

function hashEmail(email: string): string {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
}

async function loadSet(file: string): Promise<Set<string>> {
  try {
    const raw = await readFile(path.join(dataDir, file), "utf8");
    const parsed: unknown = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : []);
  } catch {
    return new Set();
  }
}

async function saveSet(file: string, set: Set<string>): Promise<void> {
  await mkdir(dataDir, { recursive: true });
  await writeFile(
    path.join(dataDir, file),
    JSON.stringify([...set], null, 2),
    "utf8",
  );
}

export async function hasDuplicate(
  kind: "interest" | "newsletter" | "custom",
  email: string,
  extra = "",
): Promise<boolean> {
  const set = await loadSet(`${kind}.json`);
  return set.has(`${hashEmail(email)}:${extra}`);
}

export async function remember(
  kind: "interest" | "newsletter" | "custom",
  email: string,
  extra = "",
): Promise<void> {
  const file = `${kind}.json`;
  const set = await loadSet(file);
  set.add(`${hashEmail(email)}:${extra}`);
  await saveSet(file, set);
}
