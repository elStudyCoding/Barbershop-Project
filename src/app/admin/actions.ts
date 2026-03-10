"use server";

import { revalidatePath } from "next/cache";
import { addBooking, removeBooking, updateBookingStatus } from "./data";

export async function createBooking(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const service = String(formData.get("service") || "").trim();
  const date = String(formData.get("date") || "").trim();
  const time = String(formData.get("time") || "").trim();

  if (!name || !phone || !service || !date || !time) {
    return;
  }

  await addBooking({ name, phone, service, date, time });
  revalidatePath("/admin");
}

export async function setBookingStatus(formData: FormData) {
  const id = String(formData.get("id") || "").trim();
  const status = String(formData.get("status") || "").trim();

  if (!id || !status) {
    return;
  }

  if (status === "pending" || status === "confirmed" || status === "done" || status === "cancelled") {
    await updateBookingStatus(id, status);
    revalidatePath("/admin");
  }
}

export async function deleteBooking(formData: FormData) {
  const id = String(formData.get("id") || "").trim();
  if (!id) {
    return;
  }

  await removeBooking(id);
  revalidatePath("/admin");
}
