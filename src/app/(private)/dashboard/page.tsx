"use client";

import Link from "next/link";

export default function Dashboard() {
    return (
        <main className="min-h-screen min-w-screen bg-zinc-950 text-white">
            <nav className="flex items-center justify-between border-b border-zinc-800 px-8 py-5">
                <Link
                    href="/dashboard"
                    className="text-2xl font-bold tracking-tight"
                >
                    Fin<span className="text-emerald-400">Track</span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link
                        href="/dashboard"
                        className="text-sm text-white"
                    >
                        Dashboard
                    </Link>

                    <button
                        className="text-sm text-zinc-400 transition hover:text-white"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <section className="mx-auto max-w-7xl px-6 py-10">
                <div className="mb-10">
                    <p className="text-sm text-emerald-400">
                        Welcome back
                    </p>

                    <h1 className="mt-2 text-4xl font-bold">
                        Your financial dashboard
                    </h1>

                    <p className="mt-2 text-zinc-500">
                        Keep track of your money and reach your financial goals.
                    </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                        <p className="text-sm text-zinc-500">
                            Total balance
                        </p>

                        <h2 className="mt-3 text-3xl font-bold">
                            R$ 0,00
                        </h2>

                        <p className="mt-2 text-sm text-zinc-600">
                            Across all accounts
                        </p>
                    </div>

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                        <p className="text-sm text-zinc-500">
                            Income
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-emerald-400">
                            R$ 0,00
                        </h2>

                        <p className="mt-2 text-sm text-zinc-600">
                            This month
                        </p>
                    </div>

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                        <p className="text-sm text-zinc-500">
                            Expenses
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-red-400">
                            R$ 0,00
                        </h2>

                        <p className="mt-2 text-sm text-zinc-600">
                            This month
                        </p>
                    </div>

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                        <p className="text-sm text-zinc-500">
                            Savings
                        </p>

                        <h2 className="mt-3 text-3xl font-bold">
                            R$ 0,00
                        </h2>

                        <p className="mt-2 text-sm text-zinc-600">
                            This month
                        </p>
                    </div>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 lg:col-span-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Recent transactions
                                </h2>

                                <p className="mt-1 text-sm text-zinc-500">
                                    Your latest financial activity
                                </p>
                            </div>

                            <button className="text-sm text-emerald-400 transition hover:text-emerald-300">
                                View all
                            </button>
                        </div>

                        <div className="flex min-h-64 items-center justify-center">
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-xl">
                                    $
                                </div>

                                <h3 className="font-medium">
                                    No transactions yet
                                </h3>

                                <p className="mt-1 text-sm text-zinc-500">
                                    Your recent transactions will appear here.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                        <h2 className="text-xl font-semibold">
                            Financial goals
                        </h2>

                        <p className="mt-1 text-sm text-zinc-500">
                            Track your progress
                        </p>

                        <div className="flex min-h-64 items-center justify-center">
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-xl">
                                    🎯
                                </div>

                                <h3 className="font-medium">
                                    No goals yet
                                </h3>

                                <p className="mt-1 text-sm text-zinc-500">
                                    Create your first financial goal.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}