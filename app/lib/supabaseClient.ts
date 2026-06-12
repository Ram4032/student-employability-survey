import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// We only create the client if the URL and KEY are provided.
// This allows the app to function with mock local storage if the user hasn't set up Supabase yet.
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const saveResponseToDatabase = async (data: Record<string, string | number>) => {
  if (supabase) {
    try {
      const { error } = await supabase
        .from("employability_responses")
        .insert([data]);
      if (error) {
        console.error("Error inserting to Supabase:", error);
        throw error;
      }
      console.log("Successfully saved response to Supabase database!", data);
      return { success: true };
    } catch (err) {
      console.error("Supabase Error:", err);
      return { success: false, error: err };
    }
  } else {
    // Graceful fallback: Store in localStorage for testing
    console.warn("Supabase credentials not found. Falling back to localStorage.");
    const existingData = JSON.parse(localStorage.getItem("mock_responses") || "[]");
    existingData.push({ ...data, id: crypto.randomUUID(), created_at: new Date().toISOString() });
    localStorage.setItem("mock_responses", JSON.stringify(existingData));
    return { success: true, mock: true };
  }
};
