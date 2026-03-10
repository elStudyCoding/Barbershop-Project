"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { addBooking } from "./admin/data";

function normalizeText(value: FormDataEntryValue | null, limit = 120) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/[<>]/g, "").trim().slice(0, limit);
}

function normalizeDate(value: FormDataEntryValue | null) {
  const raw = normalizeText(value, 16);
  return /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : "";
}

function normalizeTime(value: FormDataEntryValue | null) {
  const raw = normalizeText(value, 8);
  return /^\d{2}:\d{2}$/.test(raw) ? raw : "";
}

const RATE_LIMIT_WINDOW_MS = 30_000;
const RATE_LIMIT_MAX = 6;
const rateLimitMap = new Map<string, { count: number; startedAt: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.startedAt > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, startedAt: now });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

async function getIp() {
  const headerStore = await headers();
  const forwarded = headerStore.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return headerStore.get("x-real-ip") || "local";
}

export async function createPublicBooking(formData: FormData) {
  const ip = await getIp();
  if (isRateLimited(ip)) {
    redirect("/?error=rate#booking");
  }

  const name = normalizeText(formData.get("name"), 80);
  const phone = normalizeText(formData.get("phone"), 32);
  const service = normalizeText(formData.get("service"), 60);
  const barber = normalizeText(formData.get("barber"), 60);
  const location = normalizeText(formData.get("location"), 80);
  const date = normalizeDate(formData.get("date"));
  const time = normalizeTime(formData.get("time"));

  if (!name || !phone || !service || !barber || !location || !date || !time) {
    redirect("/?error=field#booking");
  }

  await addBooking({ name, phone, service, barber, location, date, time });
  redirect("/?success=1#booking");
}
