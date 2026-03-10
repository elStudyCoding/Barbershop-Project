import { requireAdmin } from "./auth";
import { createBarber, createBooking, deleteBarber, deleteBooking, editBarber, setBookingStatus } from "./actions";
import { getBarbers, getBookings } from "./data";

const services = ["Haircut", "Haircolor", "Hair Treatment"];

const locations = ["Alsunnah Barbershop", "Al Sunnah Barbershop 2"];

const statusBadge: Record<string, string> = {
  pending: "bg-amber-200/20 text-amber-100 border-amber-200/40",
  confirmed: "bg-emerald-200/20 text-emerald-100 border-emerald-200/40",
  done: "bg-sky-200/20 text-sky-100 border-sky-200/40",
  cancelled: "bg-rose-200/20 text-rose-100 border-rose-200/40",
};

const panelClass = "rounded-3xl border border-white/10 bg-[#2a0810]/80 p-6 shadow-lg shadow-black/20";
const sectionClass = "rounded-3xl border border-white/10 bg-[#21070f]/80 p-6 shadow-lg shadow-black/20";
const inputClass =
  "h-11 w-full rounded-xl border border-white/10 bg-[#18050b] px-4 text-sm text-white outline-none focus:border-rose-200/50";

export default async function AdminPage() {
  await requireAdmin();
  const bookings = await getBookings();
  const barbers = await getBarbers();
  const bookingCounts = bookings.reduce<Record<string, number>>((acc, booking) => {
    const key = booking.barber || "Unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#18050b] text-white">
      <header className="border-b border-white/10 bg-[#1b050b]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-rose-100/70">Admin Dashboard</p>
            <h1 className="text-2xl font-semibold tracking-[0.12em]">Al Sunnah</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-rose-100/70">
            <a href="/" className="rounded-full border border-white/10 px-3 py-1.5 uppercase tracking-[0.2em] hover:border-rose-200/60">
              Landing
            </a>
            <span className="rounded-full border border-white/10 px-3 py-1.5 uppercase tracking-[0.2em]">
              Admin
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1.5 uppercase tracking-[0.2em]">
              Dummy Server
            </span>
            <form action="/admin/logout" method="post">
              <button
                type="submit"
                className="rounded-full border border-rose-200/40 px-3 py-1.5 uppercase tracking-[0.2em] hover:border-rose-200"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className={panelClass}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Tambah Booking</h2>
                <p className="mt-1 text-sm text-rose-100/80">Semua data tersimpan di file JSON lokal.</p>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-rose-100/70">
                Form Booking
              </span>
            </div>

            <form action={createBooking} className="mt-6 grid gap-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Nama</label>
                  <input name="name" placeholder="Nama pelanggan" className={inputClass} required />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-rose-100/70">WhatsApp</label>
                  <input name="phone" placeholder="+62..." className={inputClass} required />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Layanan</label>
                  <select name="service" className={inputClass} defaultValue="" required>
                    <option value="" disabled>
                      Pilih layanan
                    </option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Kapster</label>
                  <select name="barber" className={inputClass} defaultValue="" required>
                    <option value="" disabled>
                      Pilih kapster
                    </option>
                    {barbers.map((barber) => (
                      <option key={barber.id} value={barber.name}>
                        {barber.name} - {barber.location}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-rose-100/70">Pilih kapster sesuai lokasi yang diinginkan.</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2 min-w-0">
                  <label className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Lokasi</label>
                  <select name="location" className={inputClass} defaultValue="" required>
                    <option value="" disabled>
                      Pilih lokasi
                    </option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2 min-w-0">
                  <label className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Tanggal</label>
                  <input type="date" name="date" className={inputClass} required />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2 min-w-0 sm:col-span-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Jam</label>
                  <input type="time" name="time" className={inputClass} required />
                </div>
              </div>
              <button type="submit" className="mt-1 h-11 rounded-full bg-rose-100 px-6 text-sm font-semibold text-[#2a0810] hover:bg-white">
                Simpan Booking
              </button>
            </form>
          </div>

          <div className={panelClass}>
            <h2 className="text-lg font-semibold">Quick Stats</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Total Booking</p>
                <p className="mt-3 text-2xl font-semibold">{bookings.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Pending</p>
                <p className="mt-3 text-2xl font-semibold">
                  {bookings.filter((booking) => booking.status === "pending").length}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Confirmed</p>
                <p className="mt-3 text-2xl font-semibold">
                  {bookings.filter((booking) => booking.status === "confirmed").length}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Done</p>
                <p className="mt-3 text-2xl font-semibold">
                  {bookings.filter((booking) => booking.status === "done").length}
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm text-rose-100/70">
              Data dummy ini tersimpan di file JSON lokal. Untuk produksi, pakai database.
            </p>
          </div>
        </section>

        <section className={`mt-10 ${sectionClass}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Kelola Kapster</h2>
            <p className="text-sm text-rose-100/70">Tambah, ubah nama, atau pindah lokasi kapster.</p>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <form action={createBarber} className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-rose-100/70">Tambah Kapster</p>
                  <p className="mt-1 text-sm text-rose-100/70">Isi nama dan pilih lokasi.</p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-rose-100/70">
                  Form
                </span>
              </div>
              <div className="grid gap-3">
                <label className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Nama Kapster Baru</label>
                <input name="barber_name" placeholder="Nama kapster" className={inputClass} required />
              </div>
              <div className="grid gap-3">
                <label className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Lokasi</label>
                <select name="barber_location" className={inputClass} defaultValue="" required>
                  <option value="" disabled>
                    Pilih lokasi
                  </option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="h-10 rounded-full bg-rose-100 px-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2a0810] hover:bg-white"
                >
                  Tambah
                </button>
              </div>
            </form>

            <div className="grid gap-4 sm:grid-cols-2">
              {barbers.map((barber) => (
                <div key={barber.id} className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <p className="text-xs text-rose-100/70">{barber.id}</p>
                      <p className="text-base font-semibold">{barber.name}</p>
                      <p className="text-sm text-rose-100/70">{barber.location}</p>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-rose-100/80">
                        Booking
                        <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold text-[#2a0810]">
                          {bookingCounts[barber.name] || 0}
                        </span>
                      </div>
                    </div>
                    <form action={deleteBarber}>
                      <input type="hidden" name="barber_id" value={barber.id} />
                      <button
                        type="submit"
                        className="h-8 rounded-full border border-rose-200/40 px-3 text-[11px] uppercase tracking-[0.2em] text-rose-100 hover:border-rose-200"
                      >
                        Hapus
                      </button>
                    </form>
                  </div>
                  <form action={editBarber} className="mt-4 grid flex-1 gap-3">
                    <input type="hidden" name="barber_id" value={barber.id} />
                    <input
                      name="barber_name"
                      defaultValue={barber.name}
                      className={inputClass}
                      required
                    />
                    <select
                      name="barber_location"
                      defaultValue={barber.location}
                      className={inputClass}
                      required
                    >
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                    <div className="mt-auto flex justify-end">
                      <button
                        type="submit"
                        className="h-9 rounded-full border border-white/10 px-3 text-[11px] uppercase tracking-[0.2em] text-rose-50/90 hover:border-rose-200/60 hover:text-white"
                      >
                        Simpan
                      </button>
                    </div>
                  </form>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`mt-10 ${sectionClass}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Daftar Booking</h2>
            <p className="text-sm text-rose-100/70">Update status dengan satu klik.</p>
          </div>

          <div className="mt-6 grid gap-4">
            {bookings.map((booking) => (
              <article key={booking.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-rose-100/70">{booking.id}</p>
                    <h3 className="text-lg font-semibold">{booking.name}</h3>
                    <p className="mt-1 text-sm text-rose-100/80">{booking.phone}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-rose-50/90">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{booking.service}</span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{booking.barber}</span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        {booking.location || "Alsunnah Barbershop"}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{booking.date}</span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{booking.time}</span>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs capitalize ${statusBadge[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  {(["pending", "confirmed", "done", "cancelled"] as const).map((status) => (
                    <form key={status} action={setBookingStatus}>
                      <input type="hidden" name="id" value={booking.id} />
                      <input type="hidden" name="status" value={status} />
                      <button
                        type="submit"
                        className="rounded-full border border-white/10 px-3 py-1 text-rose-50/90 hover:border-rose-200/60 hover:text-white"
                      >
                        {status}
                      </button>
                    </form>
                  ))}
                  <form action={deleteBooking}>
                    <input type="hidden" name="id" value={booking.id} />
                    <button
                      type="submit"
                      className="rounded-full border border-rose-200/40 px-3 py-1 text-rose-100 hover:border-rose-200"
                    >
                      hapus
                    </button>
                  </form>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}



