import { isSupabaseConfigured } from "../../lib/supabase.js";
import { mockSubmissionService } from "./mockAdapter.js";
import { supabaseSubmissionService } from "./supabaseAdapter.js";
import type { SubmissionService } from "./SubmissionService.js";

export function createSubmissionService(): SubmissionService {
  if (isSupabaseConfigured()) {
    console.info("Submissions: Supabase");
    return supabaseSubmissionService;
  }
  console.info("Submissions: mock (set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to persist)");
  return mockSubmissionService;
}
