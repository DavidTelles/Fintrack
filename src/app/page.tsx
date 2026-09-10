import Link from "next/link";

export default function Home() {
    return (
        <main className="min-h-screen min-w-screen bg-zinc-950 text-white">
            <nav className="flex items-center justify-between px-8 py-6 border-b border-zinc-800">
                <h1 className="text-2xl font-bold tracking-tight">
                    Fin<span className="text-emerald-400">Track</span>
                </h1>

                <div className="flex items-center gap-4">
                    <Link
                        href="/login"
                        className="px-5 py-2 text-sm font-medium text-zinc-300 transition hover:text-white"
                    >
                        Login
                    </Link>

                    <Link
                        href="/register"
                        className="rounded-lg bg-emerald-500 px-5 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400"
                    >
                        Get started
                    </Link>
                </div>
            </nav>

            <section className="flex min-h-[calc(100vh-89px)] items-center justify-center px-6">
                <div className="max-w-4xl text-center">
                    <div className="mb-6 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
                        Personal finance, simplified
                    </div>

                    <h2 className="text-5xl font-bold tracking-tight sm:text-7xl">
                        Take control of your{" "}
                        <span className="text-emerald-400">money.</span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
                        Track your income, expenses and financial goals in one
                        simple and powerful platform.
                    </p>

                    <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/register"
                            className="rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-zinc-950 transition hover:bg-emerald-400"
                        >
                            Create your account
                        </Link>

                        <Link
                            href="/login"
                            className="rounded-xl border border-zinc-700 px-8 py-4 font-semibold text-white transition hover:bg-zinc-900"
                        >
                            I already have an account
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}