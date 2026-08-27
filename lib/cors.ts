import { NextResponse } from "next/server";

const allowedOrigin = process.env.FRONTEND_URL ?? "*";

export function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
  };
}

export function corsJson(body: unknown, init?: ResponseInit) {
  return NextResponse.json(body, {
    ...init,
    headers: { ...corsHeaders(), ...(init?.headers ?? {}) },
  });
}

export function handleOptions() {
  return NextResponse.json({}, { headers: corsHeaders() });
}
