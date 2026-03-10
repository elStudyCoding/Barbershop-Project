"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "admin_auth";
const COOKIE_VALUE = "1";

export function requireAdmin() {
  const cookieStore = cookies();
  const isAuthed = cookieStore.get(COOKIE_NAME)?.value === COOKIE_VALUE;

  if (!isAuthed) {
    redirect("/admin/login");
  }
}

export async function loginAdmin(formData: FormData) {
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "").trim();

  if (username !== "admin" || password !== "123456") {
    redirect("/admin/login?error=1");
  }

  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 0,
  });

  redirect("/admin/login");
}
