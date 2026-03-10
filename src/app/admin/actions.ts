"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { addBarber, addBooking, removeBarber, removeBooking, updateBarber, updateBookingStatus } from "./data";

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
const RATE_LIMIT_MAX = 12;
const rateLimitMap = new Map<string, { count: number; startedAt: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.startedAt > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, startedAt: now });
    return false;
  }

  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }

  return false;
}

async function getIp() {
  const headerStore = await headers();
  const forwarded = headerStore.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return headerStore.get("x-real-ip") || "local";
}

export async function createBooking(formData: FormData) {
  const ip = await getIp();
  if (isRateLimited(ip)) {
    return;
  }
  const name = normalizeText(formData.get("name"), 80);
  const phone = normalizeText(formData.get("phone"), 32);
  const service = normalizeText(formData.get("service"), 60);
  const barber = normalizeText(formData.get("barber"), 60);
  const location = normalizeText(formData.get("location"), 80);
  const date = normalizeDate(formData.get("date"));
  const time = normalizeTime(formData.get("time"));

  if (!name || !phone || !service || !barber || !location || !date || !time) {
    return;
  }

  await addBooking({ name, phone, service, barber, location, date, time });
  revalidatePath("/admin");
}

export async function setBookingStatus(formData: FormData) {
  const ip = await getIp();
  if (isRateLimited(ip)) {
    return;
  }
  const id = normalizeText(formData.get("id"), 16);
  const status = normalizeText(formData.get("status"), 16);

  if (!id || !status) {
    return;
  }

  if (status === "pending" || status === "confirmed" || status === "done" || status === "cancelled") {
    await updateBookingStatus(id, status);
    revalidatePath("/admin");
  }
}

export async function deleteBooking(formData: FormData) {
  const ip = await getIp();
  if (isRateLimited(ip)) {
    return;
  }
  const id = normalizeText(formData.get("id"), 16);
  if (!id) {
    return;
  }

  await removeBooking(id);
  revalidatePath("/admin");
}

export async function createBarber(formData: FormData) {
  const ip = await getIp();
  if (isRateLimited(ip)) {
    return;
  }

  const name = normalizeText(formData.get("barber_name"), 80);
  const location = normalizeText(formData.get("barber_location"), 80);

  if (!name || !location) {
    return;
  }

  await addBarber({ name, location });
  revalidatePath("/admin");
}

export async function editBarber(formData: FormData) {
  const ip = await getIp();
  if (isRateLimited(ip)) {
    return;
  }

  const id = normalizeText(formData.get("barber_id"), 16);
  const name = normalizeText(formData.get("barber_name"), 80);
  const location = normalizeText(formData.get("barber_location"), 80);

  if (!id || !name || !location) {
    return;
  }

  await updateBarber(id, { name, location });
  revalidatePath("/admin");
}

export async function deleteBarber(formData: FormData) {
  const ip = await getIp();
  if (isRateLimited(ip)) {
    return;
  }

  const id = normalizeText(formData.get("barber_id"), 16);
  if (!id) {
    return;
  }

  await removeBarber(id);
  revalidatePath("/admin");
}
