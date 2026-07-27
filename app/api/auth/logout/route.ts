import { NextRequest, NextResponse } from "next/server";
import { clearSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await clearSession();
  } catch (err) {
    console.error("[logout_error]", err);
  }

  // Use request.url to construct dynamic origin (e.g. https://bulkymailer.au-acadex.com/login)
  const redirectUrl = new URL("/login", request.url);
  const response = NextResponse.redirect(redirectUrl, 303);
  response.cookies.delete("bm_session");
  return response;
}

export async function GET(request: NextRequest) {
  try {
    await clearSession();
  } catch (err) {
    console.error("[logout_error]", err);
  }

  const redirectUrl = new URL("/login", request.url);
  const response = NextResponse.redirect(redirectUrl, 302);
  response.cookies.delete("bm_session");
  return response;
}
