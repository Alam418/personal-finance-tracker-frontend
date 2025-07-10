"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">💰 MyFinance</h1>
      <div className="space-x-4">
        <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>
        <Link href="/transaction" className="text-gray-700 hover:text-blue-600">
          Transaction
        </Link>
        <Link href="/accounts" className="text-gray-700 hover:text-blue-600">
          Accounts
        </Link>
        <Link href="/categories" className="text-gray-700 hover:text-blue-600">
          Categories
        </Link>
        <Link href="/login" className="text-gray-700 hover:text-blue-600">
          Login
        </Link>
      </div>
    </nav>
  );
}
