"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "admin_auth";
const COOKIE_VALUE = "1";

export async function requireAdmin() {
  const cookieStore = await cookies();
  const isAuthed = cookieStore.get(COOKIE_NAME)?.value === COOKIE_VALUE;

  if (!isAuthed) {
    redirect("/admin/login?next=/admin");
  }
}

// Login/logout handled by route handlers in /admin/login and /admin/logout
