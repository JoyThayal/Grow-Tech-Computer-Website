import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/middleware";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // যদি next প্যারামিটার থাকে সেখানে যাবে, না হলে হোমপেজে (`/`) যাবে
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // কোনো এরর হলে হোমপেজে রিডাইরেক্ট করবে
  return NextResponse.redirect(`${origin}/`);
}
