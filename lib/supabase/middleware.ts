import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // রিফ্রেশ টোকেন বা সেশন আপডেট করার জন্য
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // সুরক্ষিত পেজ যেমন /book বা অন্য কোনো প্রটেক্টেদ রাউট চেক করতে চাইলে এখানে লজিক দিতে পারো
  if (!user && request.nextUrl.pathname.startsWith("/book")) {
    // লগইন করা না থাকলে হোমপেজে রিডাইরেক্ট করে দেবে
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
