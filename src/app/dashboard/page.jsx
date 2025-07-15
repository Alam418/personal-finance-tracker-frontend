"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [summary, setSummary] = useState();
  const [transactions, setTransaction] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("Token:", token);
    if (!token) {
      console.warn("Belum login!");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get("http://localhost:3005/api/v1/transactions/summary", { headers })
      .then((res) => setSummary(res.data))
      .catch((err) => {
        console.error(
          "SUMMARY ERROR:",
          err.response?.status,
          err.response?.data
        );
      });

    axios
      .get("http://localhost:3005/api/v1/transactions", {
        headers,
        params: { limit: 5, page: 1 },
      })
      .then((res) => setTransaction(res.data.data))
      .catch((err) => {
        console.error(
          "SUMMARY ERROR:",
          err.response?.status,
          err.response?.data
        );
      });

    console.log(setSummary);
  }, []);

  if (!summary) return <p>Loading summary...</p>;

  return (
    <div>
      <section>
        <h2>Ringkasan Keuangan</h2>
        {summary ? (
          <div>
            <div>
              <p>Pemasukan</p>
              <p>Rp. {summary.total_income}</p>
            </div>
            <div>
              <p>Pengeluaran</p>
              <p>Rp. {summary.total_expense}</p>
            </div>
            <div>
              <p>Saldo</p>
              <p>Rp. {summary.balance}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-400">Loading...</p>
        )}
      </section>

      <section>
        <h2>Transaksi Terbaru</h2>
        {transactions.length > 0 ? (
          <ul>
            {transactions.map((tx) => {
              return (
                <li key={tx.id}>
                  <div>
                    <p>{tx.description}</p>
                    <p>
                      {tx.transactions_date?.split("T")[0] ||
                        "Tanggal tidak tersedia"}
                    </p>
                  </div>
                  <p>
                    {tx.type === "income" ? "+" : "-"} Rp {tx.amount}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-gray-400">Belum ada transaksi</p>
        )}
      </section>
    </div>
  );
}
