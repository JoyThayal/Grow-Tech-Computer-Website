import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // যদি next প্যারামিটার থাকে সেখানে যাবে, না হলে হোমপেজে ('/') যাবে
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // সেশন সফলভাবে তৈরি হলে নির্দিষ্ট টার্গেট URL-এ রিডাইরেক্ট হবে
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // কোড না থাকলে বা ভেরিফিকেশনে এরর হলে সরাসরি হোমপেজে রিডাইরেক্ট করবে
  return NextResponse.redirect(`${origin}/`);
}
