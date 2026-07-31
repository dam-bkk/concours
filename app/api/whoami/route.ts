import { NextRequest, NextResponse } from "next/server";

/** Renvoie l'IP du client (derrière Cloudflare puis Caddy). */
export function GET(req: NextRequest) {
  const ip =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "—";
  return NextResponse.json({ ip });
}
