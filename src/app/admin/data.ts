import { promises as fs } from "fs";
import path from "path";

export type BookingStatus = "pending" | "confirmed" | "done" | "cancelled";

export type Booking = {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: BookingStatus;
  createdAt: number;
};

const dataFilePath = path.join(process.cwd(), "data", "bookings.json");

const seed: Booking[] = [
  {
    id: "BK-1001",
    name: "Ahmad Fauzi",
    phone: "+62 812-5555-1234",
    service: "Fade Cut",
    date: "2026-03-10",
    time: "19:30",
    status: "confirmed",
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
  },
  {
    id: "BK-1002",
    name: "Rizky Maulana",
    phone: "+62 813-7777-9988",
    service: "Beard Trim",
    date: "2026-03-11",
    time: "13:00",
    status: "pending",
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
  },
];

let bookingsCache: Booking[] | null = null;
let isWriting = false;

async function ensureDataFile() {
  try {
    await fs.access(dataFilePath);
  } catch {
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
    await fs.writeFile(dataFilePath, JSON.stringify(seed, null, 2));
  }
}

async function loadBookings() {
  if (bookingsCache) {
    return bookingsCache;
  }

  await ensureDataFile();
  const raw = await fs.readFile(dataFilePath, "utf-8");
  const parsed = JSON.parse(raw) as Booking[];
  bookingsCache = parsed;
  return bookingsCache;
}

async function persistBookings(next: Booking[]) {
  bookingsCache = next;

  if (isWriting) {
    return;
  }

  isWriting = true;
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(bookingsCache, null, 2));
  } finally {
    isWriting = false;
  }
}

export async function getBookings() {
  const list = await loadBookings();
  return list.slice().sort((a, b) => b.createdAt - a.createdAt);
}

export async function addBooking(input: Omit<Booking, "id" | "createdAt" | "status">) {
  const id = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
  const booking: Booking = {
    id,
    status: "pending",
    createdAt: Date.now(),
    ...input,
  };

  const list = await loadBookings();
  const next = [booking, ...list];
  await persistBookings(next);
  return booking;
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  const list = await loadBookings();
  const next = list.map((booking) => (booking.id === id ? { ...booking, status } : booking));
  await persistBookings(next);
}

export async function removeBooking(id: string) {
  const list = await loadBookings();
  const next = list.filter((booking) => booking.id !== id);
  await persistBookings(next);
}
