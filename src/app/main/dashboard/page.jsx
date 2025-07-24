"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3005/api/v1/auth/me", { withCredentials: true })
      .catch(() => router.push("/login"));

    axios
      .get("http://localhost:3005/api/v1/transactions/summary", {
        withCredentials: true,
      })
      .then((res) => setSummary(res.data))
      .catch(console.error);

    axios
      .get("http://localhost:3005/api/v1/transactions", {
        withCredentials: true,
        params: { limit: 5, page: 1 },
      })
      .then((res) => setTransactions(res.data.data))
      .catch(console.error);
  }, []);

  if (!summary)
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
    );

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          label="Income"
          amount={summary.total_income}
          color="green"
          icon={<ArrowDownCircle className="w-5 h-5" />}
          prefix="+"
        />
        <Card
          label="Expense"
          amount={summary.total_expense}
          color="red"
          icon={<ArrowUpCircle className="w-5 h-5" />}
          prefix="-"
        />
        <Card
          label="Balance"
          amount={summary.balance}
          color="blue"
          icon={<Wallet className="w-5 h-5" />}
        />
      </section>

      {/* Transaction List */}
      <section className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-gray-800 font-semibold">
            Newest transaction
          </h2>
          <button
            onClick={() => router.push("/main/transaction")}
            className="text-blue-600 hover:underline text-sm"
          >
            See all →
          </button>
        </div>

        {transactions.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {transactions.map((tx) => (
              <li
                key={tx.id}
                className="py-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">{tx.description}</p>
                  <p className="text-sm text-gray-500">
                    {tx.category_name || "Tanpa Kategori"} •{" "}
                    {tx.account_name || "Tanpa Akun"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {tx.transaction_date?.split("T")[0]}
                  </p>
                </div>
                <p
                  className={`font-bold text-sm ${
                    tx.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {tx.type === "income" ? "+" : "-"} Rp{" "}
                  {tx.amount.toLocaleString("id-ID")}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-sm">Belum ada transaksi</p>
        )}
      </section>
    </div>
  );
}

function Card({ label, amount, color, icon, prefix = "" }) {
  const colorMap = {
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      iconBg: "bg-green-100 text-green-600",
      text: "text-green-600",
    },
    red: {
      bg: "bg-red-50",
      border: "border-red-200",
      iconBg: "bg-red-100 text-red-600",
      text: "text-red-600",
    },
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      iconBg: "bg-blue-100 text-blue-600",
      text: "text-blue-600",
    },
  };

  const c = colorMap[color] || colorMap.blue;

  return (
    <div
      className={`${c.bg} ${c.border} rounded-lg p-4 flex items-center space-x-4 shadow-sm border`}
    >
      <div className={`p-3 rounded-full ${c.iconBg}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className={`text-xl font-bold ${c.text}`}>
          {prefix}Rp {amount.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}
