import { logoutAdmin, requireAdmin } from "./auth";
import { createBooking, deleteBooking, setBookingStatus } from "./actions";
import { getBookings } from "./data";

const services = [
  "Fade Cut",
  "Classic Cut",
  "Beard Trim",
  "Hot Towel Shave",
  "Hair Styling",
  "Kids Cut",
];

const statusBadge: Record<string, string> = {
  pending: "bg-amber-200/20 text-amber-100 border-amber-200/40",
  confirmed: "bg-emerald-200/20 text-emerald-100 border-emerald-200/40",
  done: "bg-sky-200/20 text-sky-100 border-sky-200/40",
  cancelled: "bg-rose-200/20 text-rose-100 border-rose-200/40",
};

export default async function AdminPage() {
  requireAdmin();
  const bookings = await getBookings();

  return (
    <div className="min-h-screen bg-[#18050b] text-white">
      <header className="border-b border-white/10 bg-[#22070f]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-rose-100/70">Admin Dashboard</p>
            <h1 className="text-2xl font-semibold tracking-[0.12em]">Al Sunnah</h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-rose-100/80">
            <span>Dummy Server Mode</span>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="rounded-full border border-rose-200/40 px-4 py-2 text-xs font-semibold text-rose-100 hover:border-rose-200"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-[#2a0810]/80 p-6 shadow-lg shadow-black/20">
            <h2 className="text-lg font-semibold">Tambah Booking</h2>
            <p className="mt-1 text-sm text-rose-100/80">Semua data tersimpan di file JSON lokal.</p>

            <form action={createBooking} className="mt-6 grid gap-4">
              <div className="grid gap-2">
                <label className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Nama</label>
                <input
                  name="name"
                  placeholder="Nama pelanggan"
                  className="rounded-xl border border-white/10 bg-[#18050b] px-4 py-3 text-sm text-white outline-none focus:border-rose-200/50"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label className="text-xs uppercase tracking-[0.2em] text-rose-100/70">WhatsApp</label>
                <input
                  name="phone"
                  placeholder="+62..."
                  className="rounded-xl border border-white/10 bg-[#18050b] px-4 py-3 text-sm text-white outline-none focus:border-rose-200/50"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Layanan</label>
                <select
                  name="service"
                  className="rounded-xl border border-white/10 bg-[#18050b] px-4 py-3 text-sm text-white outline-none focus:border-rose-200/50"
                  defaultValue=""
                  required
                >
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
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Tanggal</label>
                  <input
                    type="date"
                    name="date"
                    className="rounded-xl border border-white/10 bg-[#18050b] px-4 py-3 text-sm text-white outline-none focus:border-rose-200/50"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Jam</label>
                  <input
                    type="time"
                    name="time"
                    className="rounded-xl border border-white/10 bg-[#18050b] px-4 py-3 text-sm text-white outline-none focus:border-rose-200/50"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-2 rounded-full bg-rose-100 px-6 py-3 text-sm font-semibold text-[#2a0810] hover:bg-white"
              >
                Simpan Booking
              </button>
            </form>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#2a0810]/80 p-6 shadow-lg shadow-black/20">
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

        <section className="mt-10 rounded-3xl border border-white/10 bg-[#21070f]/80 p-6 shadow-lg shadow-black/20">
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
                    <p className="mt-2 text-sm text-rose-100/70">
                      {booking.service} • {booking.date} • {booking.time}
                    </p>
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
