import { promises as fs } from "fs";
import path from "path";

export type BookingStatus = "pending" | "confirmed" | "done" | "cancelled";

export type Booking = {
  id: string;
  name: string;
  phone: string;
  service: string;
  barber: string;
  location: string;
  date: string;
  time: string;
  status: BookingStatus;
  createdAt: number;
};

export type Barber = {
  id: string;
  name: string;
  location: string;
};

const dataFilePath = path.join(process.cwd(), "data", "bookings.json");
const barbersFilePath = path.join(process.cwd(), "data", "barbers.json");

const seed: Booking[] = [
  {
    id: "BK-1001",
    name: "Ahmad Fauzi",
    phone: "+62 812-5555-1234",
    service: "Fade Cut",
    barber: "Ust. Fikri",
    location: "Alsunnah Barbershop",
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
    barber: "Akbar",
    location: "Al Sunnah Barbershop 2",
    date: "2026-03-11",
    time: "13:00",
    status: "pending",
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
  },
];

const barberSeed: Barber[] = [
  { id: "B-101", name: "Ust. Fikri", location: "Alsunnah Barbershop" },
  { id: "B-102", name: "Akbar", location: "Alsunnah Barbershop" },
  { id: "B-201", name: "Jimny", location: "Al Sunnah Barbershop 2" },
  { id: "B-202", name: "Riko", location: "Al Sunnah Barbershop 2" },
  { id: "B-203", name: "Dimas", location: "Al Sunnah Barbershop 2" },
  { id: "B-204", name: "Yunus", location: "Al Sunnah Barbershop 2" },
];

let bookingsCache: Booking[] | null = null;
let isWriting = false;
let barbersCache: Barber[] | null = null;
let isWritingBarbers = false;

async function ensureDataFile() {
  try {
    await fs.access(dataFilePath);
  } catch {
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
    await fs.writeFile(dataFilePath, JSON.stringify(seed, null, 2));
  }
}

async function ensureBarbersFile() {
  try {
    await fs.access(barbersFilePath);
  } catch {
    await fs.mkdir(path.dirname(barbersFilePath), { recursive: true });
    await fs.writeFile(barbersFilePath, JSON.stringify(barberSeed, null, 2));
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

async function loadBarbers() {
  if (barbersCache) {
    return barbersCache;
  }

  await ensureBarbersFile();
  const raw = await fs.readFile(barbersFilePath, "utf-8");
  const parsed = JSON.parse(raw) as Barber[];
  barbersCache = parsed;
  return barbersCache;
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

async function persistBarbers(next: Barber[]) {
  barbersCache = next;

  if (isWritingBarbers) {
    return;
  }

  isWritingBarbers = true;
  try {
    await fs.writeFile(barbersFilePath, JSON.stringify(barbersCache, null, 2));
  } finally {
    isWritingBarbers = false;
  }
}

export async function getBookings() {
  const list = await loadBookings();
  return list.slice().sort((a, b) => b.createdAt - a.createdAt);
}

export async function getBarbers() {
  const list = await loadBarbers();
  return list.slice().sort((a, b) => a.name.localeCompare(b.name));
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

export async function addBarber(input: Omit<Barber, "id">) {
  const id = `B-${Math.floor(100 + Math.random() * 900)}`;
  const barber: Barber = {
    id,
    ...input,
  };
  const list = await loadBarbers();
  const next = [...list, barber];
  await persistBarbers(next);
  return barber;
}

export async function updateBarber(id: string, input: Omit<Barber, "id">) {
  const list = await loadBarbers();
  const next = list.map((barber) => (barber.id === id ? { ...barber, ...input } : barber));
  await persistBarbers(next);
}

export async function removeBarber(id: string) {
  const list = await loadBarbers();
  const next = list.filter((barber) => barber.id !== id);
  await persistBarbers(next);
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
