"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col px-4 py-6">
      <h1 className="text-xl font-bold mb-6 text-center text-blue-600">
        💰 MyFinance
      </h1>
      <nav className="flex flex-col gap-4">
        <Link
          href="/main/dashboard"
          className="text-gray-700 hover:text-blue-600"
        >
          Dashboard
        </Link>
        <Link
          href="/main/transaction"
          className="text-gray-700 hover:text-blue-600"
        >
          Transactions
        </Link>
        <Link
          href="/main/accounts"
          className="text-gray-700 hover:text-blue-600"
        >
          Accounts
        </Link>
        <Link
          href="/main/categories"
          className="text-gray-700 hover:text-blue-600"
        >
          Categories
        </Link>
      </nav>
    </aside>
  );
}
