"use client";

import Link from "next/link";
import { useState } from "react";
import "../../globals.css";
import { useRouter } from "next/navigation";

export default function Login() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function login(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const email = formData.get("email");
        const password = formData.get("password");

        setLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                alert(
                    result.error ||
                    result.message ||
                    "Invalid email or password"
                );
                return;
            }

            router.push('/dashboard');
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Internal server error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen min-w-screen items-center justify-center bg-zinc-950 px-6 text-white">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <Link
                        href="/"
                        className="text-3xl font-bold tracking-tight"
                    >
                        Fin<span className="text-emerald-400">Track</span>
                    </Link>

                    <h2 className="mt-8 text-3xl font-bold">
                        Welcome back
                    </h2>

                    <p className="mt-2 text-zinc-400">
                        Login to access your finances.
                    </p>
                </div>

                <form
                    onSubmit={login}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-2xl"
                >
                    <div className="space-y-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-zinc-300"
                            >
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="you@example.com"
                                required
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-400"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-zinc-300"
                            >
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Your password"
                                required
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-400"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-emerald-500 py-3 font-semibold text-zinc-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-zinc-500">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-emerald-400 transition hover:text-emerald-300"
                    >
                        Create an account
                    </Link>
                </p>
            </div>
        </main>
    );
}