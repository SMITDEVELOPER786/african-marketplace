import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.redirect(`${origin}/auth/error?error=supabase_not_configured`)
    }

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error("OAuth callback error:", error)
      return NextResponse.redirect(`${origin}/auth/error?error=${error.message}`)
    }

    // Get user to determine redirect
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      // Redirect to customer dashboard for OAuth users (they are always customers)
      return NextResponse.redirect(`${origin}/customer`)
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${origin}/`)
}
