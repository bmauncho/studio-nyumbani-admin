// actions/set-store-cookie.ts
"use server";
import { cookies } from "next/headers";

export const setStoreCookie = async (storeId: string) => {
  const cookieStore = await cookies();
  cookieStore.set("selectedStoreId", storeId, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
    sameSite: "lax",
  });
};
