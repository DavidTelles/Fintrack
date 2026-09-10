'use client'

export default function Topbar() {
    return (
        <>
        <nav className="h-screen w-50 bg-sky-900">
            <ul>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/account">Account</a></li>
                <li><a href="/transactions">Transactions</a></li>
                <li><a href="/categories">Categories</a></li>
                <li><a href="/goals">Goals</a></li>
            </ul>
        </nav>
    </>
    )
}