import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const url = process.env.SUPABASE_SUPABASE_NEXT_PUBLIC_SUPABASE_URL || ""
  const key = process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY_ANON_KEY || ""

  if (!url || !key) {
    console.log("[v0] Supabase not configured - using mock data mode")
    return null
  }

  return createBrowserClient(url, key)
}

export { createClient as createBrowserClient }
