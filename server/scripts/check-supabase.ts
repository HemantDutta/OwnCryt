import "../src/config.js";
import { getSupabase, isSupabaseConfigured } from "../src/lib/supabase.js";

if (!isSupabaseConfigured()) {
  console.log("RESULT: env not loaded (mock mode)");
  process.exit(1);
}

const supabase = getSupabase();
const { count, error } = await supabase
  .from("product_interests")
  .select("id", { count: "exact", head: true });

if (error) {
  console.log(`RESULT: query failed | ${error.code ?? "no-code"} | ${error.message}`);
  process.exit(1);
}

console.log(`RESULT: product_interests reachable | rows=${count ?? 0}`);
