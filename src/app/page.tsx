import type { Metadata } from "next";
import ScrollReveal from "./components/ScrollReveal";
import { createPublicBooking } from "./actions";
import { getBarbers } from "./admin/data";
type Location = {
  city: string;
  address: string;
  phone: string;
  hours: string;
  mapEmbed: string;
  mapLink: string;
};

type Barber = {
  name: string;
  specialty: string;
  shift: string;
  location: string;
};

const locations: Location[] = [
  {
    city: "Alsunnah Barbershop",
    address: "Pin Google Maps: Alsunnah Barbershop, Kota Probolinggo, Jawa Timur",
    phone: "+62 822-1752-2019",
    hours: "Setiap hari, hingga 22:00",
    mapEmbed: "https://www.google.com/maps?q=-7.7558229,113.2160418&z=17&output=embed",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=-7.7558229,113.2160418",
  },
  {
    city: "Al Sunnah Barbershop 2",
    address: "Al Sunnah Barbershop 2, Kota Probolinggo, Jawa Timur (sesuai pin Google Maps)",
    phone: "+62 811-3333-9090",
    hours: "Setiap hari, 10:00 - 22:00",
    mapEmbed: "https://www.google.com/maps?q=Al+Sunnah+Barbershop+2+Probolinggo&output=embed",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=Al+Sunnah+Barbershop+2+Probolinggo",
  },
];

const barbers: Barber[] = [
  {
    name: "Ust. Fikri",
    specialty: "Classic fade, beard shape",
    shift: "Pagi",
    location: "Alsunnah Barbershop",
  },
  {
    name: "Akbar",
    specialty: "Textured crop, modern pompadour",
    shift: "Siang",
    location: "Alsunnah Barbershop",
  },
  {
    name: "Jimny",
    specialty: "Classic fade, beard trim",
    shift: "Pagi",
    location: "Al Sunnah Barbershop 2",
  },
  {
    name: "Riko",
    specialty: "Textured crop, styling",
    shift: "Siang",
    location: "Al Sunnah Barbershop 2",
  },
  {
    name: "Dimas",
    specialty: "Buzz cut, hot towel shave",
    shift: "Sore",
    location: "Al Sunnah Barbershop 2",
  },
  {
    name: "Yunus",
    specialty: "Kids cut, clean side part",
    shift: "Malam",
    location: "Al Sunnah Barbershop 2",
  },
];

const highlights = [
  { label: "Google Reviews", value: "62+" },
  { label: "Rating Google", value: "4.5/5" },
  { label: "Cabang Aktif", value: "2 Lokasi" },
];

const services = ["Haircut", "Haircolor", "Hair Treatment"];

const priceSections = [
  {
    title: "Haircut",
    items: [
      { name: "Haircut Man", price: "Rp30.000" },
      { name: "Haircut Girl", price: "Rp50.000" },
      { name: "Hair Tattoo / Shaving", price: "Rp10.000" },
    ],
  },
  {
    title: "Hair Color",
    items: [
      { name: "Hair Toning / Basic Colour", price: "Rp50.000" },
      { name: "Highlight Basic", price: "Rp70.000" },
      { name: "Highlight Colour", price: "Rp120.000" },
      { name: "Full Colour", price: "Rp200.000" },
    ],
  },
  {
    title: "Hair Treatment",
    items: [
      { name: "Face Mask", price: "Rp40.000" },
      { name: "Hair Mask", price: "Rp75.000" },
      { name: "Creambath", price: "Rp80.000" },
      { name: "Down Perm / Root Lift", price: "Rp70.000" },
      { name: "Hair Perming", price: "Rp150.000" },
      { name: "Chemical", price: "Rp200.000" },
      { name: "Keratin", price: "Rp200.000" },
    ],
  },
];

const heroPhoto =
  "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1800&q=80";

export const metadata: Metadata = {
  title: "Al Sunnah Probolinggo",
  description: "Landing page Al Sunnah Barbershop Probolinggo",
};

type HomeProps = {
  searchParams?: {
    success?: string;
    error?: string;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const adminBarbers = await getBarbers();
  const bookingSuccess = searchParams?.success === "1";
  const bookingError = searchParams?.error;
  return (
    <div className="hero-gradient page-enter relative overflow-x-clip text-white">
      <ScrollReveal />
      <div aria-hidden className="ambient-bg" />
      <div aria-hidden className="ambient-grid" />
      <div aria-hidden className="noise-overlay" />

      <header className="sticky top-0 z-30 border-b border-rose-300/30 bg-[#2a0810]/90 backdrop-blur animate-slide-down">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#hero" className="text-xl font-semibold tracking-[0.22em] text-rose-100 nav-link">
            AL SUNNAH
          </a>
          <ul className="hidden items-center gap-7 text-sm font-medium md:flex">
            <li><a className="hover:text-rose-100 nav-link" href="#about">About</a></li>
            <li><a className="hover:text-rose-100 nav-link" href="#services">Services</a></li>
            <li><a className="hover:text-rose-100 nav-link" href="#locations">Location</a></li>
            <li><a className="hover:text-rose-100 nav-link" href="#barbers">Kapster</a></li>
            <li><a className="hover:text-rose-100 nav-link" href="/admin/login">Admin</a></li>
            <li><a className="rounded-full border border-rose-200/70 px-4 py-2 text-rose-50 hover:bg-rose-100/10 nav-link" href="#booking">Book</a></li>
          </ul>
        </nav>
      </header>

      <main className="relative z-10">
        <section id="hero" className="relative min-h-[92vh] w-full py-20">
          <div aria-hidden className="hero-photo-bg" style={{ backgroundImage: `url(${heroPhoto})` }} />
          <div aria-hidden className="hero-photo-overlay" />
          <div className="mx-auto grid min-h-[92vh] w-full max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2">
            <div aria-hidden className="hero-orb hero-orb-a" />
            <div aria-hidden className="hero-orb hero-orb-b" />

            <div data-reveal="up" className="relative z-10 space-y-6 animate-fade-up">
              <p className="inline-flex rounded-full border border-rose-200/45 bg-rose-100/10 px-4 py-1 text-sm text-rose-50">
                Modern Grooming Agency
              </p>
              <h1 className="headline-glow text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
                <span className="hero-line hero-line-a block">Al Sunnah Probolinggo</span>
                <span className="hero-line hero-line-b block">Precision Cuts. Strong Presence.</span>
              </h1>
              <p className="max-w-xl text-base leading-7 text-rose-50/85 sm:text-lg">
                Bukan sekadar potong rambut. Kami membangun personal image lewat layanan barber
                yang presisi, cepat, dan konsisten di tiap kunjungan.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#booking" className="btn-wow rounded-full px-6 py-3 text-sm font-semibold text-[#5c0f21]">
                  Booking Sekarang
                </a>
                <a href="#services" className="btn-ghost rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white hover:border-rose-100 hover:text-rose-100">
                  Lihat Layanan
                </a>
                <a href="/admin/login" className="btn-ghost rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white hover:border-rose-100 hover:text-rose-100">
                  Admin Login
                </a>
              </div>

              <div className="mt-2 grid gap-3 sm:grid-cols-3">
                {highlights.map((item, index) => (
                  <div
                    key={item.label}
                    data-reveal="up"
                    className="stat-card rounded-xl border border-white/25 bg-white/8 px-4 py-3"
                    style={{ transitionDelay: `${index * 90}ms` }}
                  >
                    <p className="text-xl font-semibold text-white">{item.value}</p>
                    <p className="text-xs text-rose-50/80">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div data-reveal="zoom" className="hero-panel interactive-card relative z-10 overflow-hidden rounded-3xl border border-white/20 bg-[#4a0d1c]/55 p-8 shadow-2xl shadow-black/30 animate-fade-up delay-1">
              <div className="absolute -right-16 -top-14 h-48 w-48 rounded-full bg-rose-300/30 blur-2xl animate-float-slow" />
              <h2 className="title-shine text-2xl font-semibold text-white">Agency Standard Experience</h2>
              <ul className="mt-5 space-y-4 text-sm leading-6 text-rose-50/90 sm:text-base">
                <li>- SOP pelayanan cepat dan konsisten.</li>
                <li>- Konsultasi model sesuai karakter klien.</li>
                <li>- Peralatan steril di setiap sesi.</li>
                <li>- Suasana premium tanpa ribet.</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3 text-xs">
                <span className="chip">Steril Tools</span>
                <span className="chip">Expert Kapster</span>
                <span className="chip">Muslim Friendly</span>
              </div>
            </div>
          </div>
        </section>

        <section data-reveal="up" className="marquee-shell border-y border-white/15 bg-[#3a0a15]/55 py-4">
          <div className="marquee-track">
            {[...services, ...services].map((service, index) => (
              <span key={`${service}-${index}`} className="marquee-item">
                {service}
              </span>
            ))}
          </div>
        </section>

        <section id="services" data-reveal="up" className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 section-reveal">
          <h2 className="title-shine text-3xl font-semibold text-white sm:text-4xl">Services & Pricing</h2>
          <p className="mt-4 max-w-2xl text-rose-50/85">
            Harga berikut disesuaikan dari price list yang kamu kirim.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {priceSections.map((section) => (
              <article key={section.title} data-reveal="up" className="interactive-card rounded-2xl border border-rose-100/25 bg-[#4a0d1c]/55 p-6">
                <h3 className="text-xl font-semibold">{section.title}</h3>
                <div className="mt-4 space-y-3">
                  {section.items.map((item) => (
                    <div key={item.name} className="flex items-center justify-between gap-3 border-b border-white/10 pb-2 text-sm">
                      <span className="text-rose-50/90">{item.name}</span>
                      <span className="font-semibold text-white">{item.price}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" data-reveal="up" className="border-y border-white/15 bg-[#2a0810]/60 section-reveal">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
            <h2 className="title-shine text-3xl font-semibold text-white sm:text-4xl">About Al Sunnah</h2>
            <p className="mt-6 max-w-4xl text-base leading-8 text-rose-50/85 sm:text-lg">
              Al Sunnah Probolinggo dibangun untuk standar grooming yang rapi, bersih, dan tepat
              waktu. Konsep kami seperti agency service: terstruktur, responsif, dan berorientasi
              hasil.
            </p>
          </div>
        </section>

        <section id="locations" data-reveal="up" className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 section-reveal">
          <h2 className="title-shine text-3xl font-semibold text-white sm:text-4xl">Location & Contact</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-1">
            {locations.map((location, index) => (
              <article
                key={location.city}
                data-reveal="fade"
                className="interactive-card reveal-item rounded-2xl border border-rose-100/25 bg-[#4a0d1c]/55 p-6 shadow-lg shadow-black/25"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <h3 className="text-xl font-semibold">{location.city}</h3>
                <div className="map-zoom mt-4 overflow-hidden rounded-xl border border-white/10">
                  <iframe
                    title={`Map ${location.city}`}
                    src={location.mapEmbed}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-44 w-full"
                  />
                </div>
                <p className="mt-3 text-sm text-rose-50/85">{location.address}</p>
                <p className="mt-4 text-sm text-white">{location.phone}</p>
                <p className="mt-1 text-sm text-rose-50/85">Jam Operasional: {location.hours}</p>
                <a
                  href={location.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex rounded-full border border-rose-200/60 px-4 py-2 text-xs font-semibold text-rose-50 hover:bg-rose-100/10"
                >
                  Buka Arahan Google Maps
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="barbers" data-reveal="up" className="border-t border-white/15 bg-[#2a0810]/60 section-reveal">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
            <h2 className="title-shine text-3xl font-semibold text-white sm:text-4xl">Kapster On Duty</h2>
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              {locations.map((location) => (
                <div key={location.city}>
                  <h3 className="mb-4 text-xl font-semibold text-white">{location.city}</h3>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {barbers
                      .filter((barber) => barber.location === location.city)
                      .map((barber, index) => (
                        <article
                          key={barber.name}
                          data-reveal={index % 2 === 0 ? "up" : "zoom"}
                          className="interactive-card reveal-item rounded-2xl border border-rose-100/25 bg-[#4a0d1c]/55 p-5"
                          style={{ transitionDelay: `${index * 120}ms` }}
                        >
                          <h3 className="text-lg font-semibold text-white">{barber.name}</h3>
                          <p className="mt-2 text-sm text-rose-50/85">{barber.specialty}</p>
                          <p className="mt-4 inline-flex rounded-full border border-rose-200/50 px-3 py-1 text-xs text-rose-50">
                            Shift: {barber.shift}
                          </p>
                        </article>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section data-reveal="up" className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 section-reveal">
          <div data-reveal="zoom" className="rounded-3xl border border-rose-100/30 bg-[#4a0d1c]/55 p-8 sm:p-10">
            <p className="text-sm uppercase tracking-[0.2em] text-rose-100/90">Client Feedback</p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-rose-50/90 sm:text-2xl">
              &quot;Pelayanan cepat, kapster komunikatif, hasil potongannya konsisten. Vibe
              tempatnya premium tapi tetap nyaman.&quot;
            </p>
            <p className="mt-4 text-sm text-rose-100/80">- Pelanggan Google Maps</p>
          </div>
        </section>

        <section id="booking" data-reveal="up" className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 section-reveal">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-rose-100/90">Booking</p>
              <h2 className="title-shine mt-4 text-3xl font-semibold text-white sm:text-4xl">Booking Langsung</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-rose-50/85 sm:text-lg">
                Isi form untuk booking. Data kamu akan otomatis masuk ke dashboard admin.
              </p>
              {bookingSuccess ? (
                <div className="mt-6 rounded-2xl border border-emerald-200/40 bg-emerald-200/10 px-4 py-3 text-sm text-emerald-100">
                  Booking berhasil dikirim. Kami akan konfirmasi lewat WhatsApp.
                </div>
              ) : null}
              {bookingError === "field" ? (
                <div className="mt-6 rounded-2xl border border-rose-200/40 bg-rose-200/10 px-4 py-3 text-sm text-rose-100">
                  Form belum lengkap. Mohon isi semua field.
                </div>
              ) : null}
              {bookingError === "rate" ? (
                <div className="mt-6 rounded-2xl border border-rose-200/40 bg-rose-200/10 px-4 py-3 text-sm text-rose-100">
                  Terlalu banyak request. Coba lagi sebentar.
                </div>
              ) : null}
            </div>

            <form action={createPublicBooking} className="rounded-3xl border border-rose-100/30 bg-[#4a0d1c]/55 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Nama</label>
                  <input
                    name="name"
                    placeholder="Nama lengkap"
                    className="h-11 w-full rounded-xl border border-white/10 bg-[#18050b] px-4 text-sm text-white outline-none focus:border-rose-200/50"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-rose-100/70">WhatsApp</label>
                  <input
                    name="phone"
                    placeholder="+62..."
                    className="h-11 w-full rounded-xl border border-white/10 bg-[#18050b] px-4 text-sm text-white outline-none focus:border-rose-200/50"
                    required
                  />
                </div>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Layanan</label>
                  <select
                    name="service"
                    className="h-11 w-full rounded-xl border border-white/10 bg-[#18050b] px-4 text-sm text-white outline-none focus:border-rose-200/50"
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
                <div className="grid gap-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Kapster</label>
                  <select
                    name="barber"
                    className="h-11 w-full rounded-xl border border-white/10 bg-[#18050b] px-4 text-sm text-white outline-none focus:border-rose-200/50"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Pilih kapster
                    </option>
                    {adminBarbers.map((barber) => (
                      <option key={barber.id} value={barber.name}>
                        {barber.name} - {barber.location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Lokasi</label>
                  <select
                    name="location"
                    className="h-11 w-full rounded-xl border border-white/10 bg-[#18050b] px-4 text-sm text-white outline-none focus:border-rose-200/50"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Pilih lokasi
                    </option>
                    {locations.map((location) => (
                      <option key={location.city} value={location.city}>
                        {location.city}
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
                      className="h-11 w-full rounded-xl border border-white/10 bg-[#18050b] px-4 text-sm text-white outline-none focus:border-rose-200/50"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Jam</label>
                    <input
                      type="time"
                      name="time"
                      className="h-11 w-full rounded-xl border border-white/10 bg-[#18050b] px-4 text-sm text-white outline-none focus:border-rose-200/50"
                      required
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 h-11 w-full rounded-full bg-rose-100 text-sm font-semibold text-[#2a0810] hover:bg-white"
              >
                Kirim Booking
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer id="contact" data-reveal="up" className="border-t border-rose-200/30 bg-[#24070e] section-reveal">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-10 text-sm text-rose-50/85 sm:px-8 md:grid-cols-3">
          <div data-reveal="left">
            <p className="text-base font-semibold tracking-[0.18em] text-white">AL SUNNAH</p>
            <p className="mt-2">Cukur rapi, pelayanan sepenuh hati.</p>
          </div>
          <div data-reveal="up">
            <h3 className="text-base font-semibold text-white">Navigasi</h3>
            <ul className="mt-3 space-y-2">
              <li><a className="hover:text-white" href="#hero">Home</a></li>
              <li><a className="hover:text-white" href="#about">About</a></li>
              <li><a className="hover:text-white" href="#services">Services</a></li>
              <li><a className="hover:text-white" href="#locations">Location</a></li>
              <li><a className="hover:text-white" href="#barbers">Kapster</a></li>
            </ul>
          </div>
          <div data-reveal="right">
            <h3 className="text-base font-semibold text-white">Contacts</h3>
            <div className="mt-3 space-y-2">
              <p>WhatsApp: +62 813-9000-1212</p>
              <p>Instagram: @alsunnah.probolinggo</p>
              <p>Email: hello@alsunnahbarber.id</p>
              <p>Alamat: Probolinggo, Jawa Timur</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/15 py-4 text-center text-xs text-rose-50/70">
          Copyright {new Date().getFullYear()} Al Sunnah Barbershop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}















