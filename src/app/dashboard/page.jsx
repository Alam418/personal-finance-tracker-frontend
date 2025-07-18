"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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

  if (!summary) return <p>Loading dashboard...</p>;

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card label="Pemasukan" amount={summary.total_income} color="green" />
        <Card label="Pengeluaran" amount={summary.total_expense} color="red" />
        <Card label="Saldo" amount={summary.balance} color="blue" />
      </section>

      {/* Transaction List */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Transaksi Terbaru</h2>
        {transactions.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {transactions.map((tx) => (
              <li key={tx.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{tx.description}</p>
                  <p className="text-sm text-gray-500">
                    {tx.transaction_date?.split("T")[0]}
                  </p>
                </div>
                <p
                  className={`font-bold ${
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

function Card({ label, amount, color }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-xl font-bold text-${color}-600`}>
        Rp {amount.toLocaleString("id-ID")}
      </p>
    </div>
  );
}
