import { loginAdmin } from "../auth";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const hasError = searchParams?.error === "1";

  return (
    <div className="min-h-screen bg-[#18050b] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-xl items-center px-5 sm:px-8">
        <div className="w-full rounded-3xl border border-white/10 bg-[#2a0810]/80 p-8 shadow-lg shadow-black/20">
          <p className="text-xs uppercase tracking-[0.35em] text-rose-100/70">Admin Access</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-[0.12em]">Al Sunnah</h1>
          <p className="mt-2 text-sm text-rose-100/70">Dummy login untuk admin sementara.</p>

          <form action={loginAdmin} className="mt-6 grid gap-4">
            <div className="grid gap-2">
              <label className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Username</label>
              <input
                name="username"
                placeholder="admin"
                className="rounded-xl border border-white/10 bg-[#18050b] px-4 py-3 text-sm text-white outline-none focus:border-rose-200/50"
                required
              />
            </div>
            <div className="grid gap-2">
              <label className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Password</label>
              <input
                type="password"
                name="password"
                placeholder="123456"
                className="rounded-xl border border-white/10 bg-[#18050b] px-4 py-3 text-sm text-white outline-none focus:border-rose-200/50"
                required
              />
            </div>
            {hasError ? (
              <p className="rounded-xl border border-rose-200/30 bg-rose-200/10 px-4 py-3 text-sm text-rose-100">
                Username atau password salah.
              </p>
            ) : null}
            <button
              type="submit"
              className="mt-2 rounded-full bg-rose-100 px-6 py-3 text-sm font-semibold text-[#2a0810] hover:bg-white"
            >
              Masuk Admin
            </button>
          </form>

          <div className="mt-6 text-xs text-rose-100/60">
            Login dummy: <span className="text-rose-100">admin / 123456</span>
          </div>
        </div>
      </div>
    </div>
  );
}
