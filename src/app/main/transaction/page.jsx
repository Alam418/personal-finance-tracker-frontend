"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function TransactionsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
    type: "",
    category_id: "",
    account_id: "",
  });

  const [formData, setFormData] = useState({
    id: null,
    transaction_date: "",
    type: "",
    category_id: "",
    account_id: "",
    amount: "",
    description: "",
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchTransactions = () => {
    setLoading(true);
    setError("");

    axios
      .get("http://localhost:3005/api/v1/transactions", {
        withCredentials: true,
        params: {
          ...filters,
          page: 1,
          limit: 10,
        },
      })
      .then((res) => {
        setTransactions(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Transaction error:", err);
        setError("Gagal memuat data");
        setLoading(false);
      });
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3005/api/v1/categories", {
        withCredentials: true,
      });
      setCategories(res.data);
    } catch (error) {
      console.error("Fetch categories failed: ", error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const res = await axios.get("http://localhost:3005/api/v1/accounts", {
        withCredentials: true,
      });
      setAccounts(res.data);
    } catch (error) {
      console.error("Fetch accounts failed: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await axios.patch(
          `http://localhost:3005/api/v1/transactions/${formData.id}`,
          formData,
          { withCredentials: true }
        );
      } else {
        await axios.post(
          "http://localhost:3005/api/v1/transactions",
          formData,
          {
            withCredentials: true,
          }
        );
      }
      setShowForm(false);
      setFormData({
        id: null,
        transaction_date: "",
        type: "",
        category_id: "",
        account_id: "",
        amount: "",
        description: "",
      });
      fetchTransactions();
    } catch (err) {
      console.error("Save transaction error", err);
    }
  };

  const handleEdit = (trx) => {
    setFormData({ ...trx });
    setShowForm(true);
  };

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
    fetchAccounts();
  }, []);

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      <section className="bg-white text-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Transactions</h1>
          <button
            onClick={() => setShowForm(true)}
            className="mb-4 bg-green-600 text-white px-4 py-2 rounded text-sm"
          >
            + Add Transaction
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchTransactions();
          }}
          className="flex flex-wrap gap-4 items-end my-2"
        >
          <div>
            <label className="block text-sm">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={filters.start_date}
              onChange={handleFilterChange}
              className="border p-2 rounded text-sm"
            />
          </div>

          <div>
            <label className="block text-sm">End Date</label>
            <input
              type="date"
              name="end_date"
              value={filters.end_date}
              onChange={handleFilterChange}
              className="border p-2 rounded text-sm"
            />
          </div>

          <div>
            <label className="block text-sm">Type</label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="border p-2 rounded text-sm"
            >
              <option value="">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="block text-sm">Kategori</label>
            <select
              name="category_id"
              value={filters.category_id}
              onChange={handleFilterChange}
              className="border p-2 rounded text-sm"
            >
              <option value="">Semua</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm">Akun</label>
            <select
              name="account_id"
              value={filters.account_id}
              onChange={handleFilterChange}
              className="border p-2 rounded text-sm"
            >
              <option value="">Semua</option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
          >
            Filter
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-300">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Type</th>
                <th className="p-3">Category</th>
                <th className="p-3">Account</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trx) => (
                <tr key={trx.id} className="border-t">
                  <td className="p-3">
                    {new Date(trx.transaction_date).toLocaleDateString()}
                  </td>
                  <td className="p-3 capitalize">{trx.type}</td>
                  <td className="p-3">
                    {categories.find((cat) => cat.id === trx.category_id)
                      ?.name || "-"}
                  </td>
                  <td className="p-3">
                    {accounts.find((acc) => acc.id === trx.account_id)?.name ||
                      "-"}
                  </td>
                  <td className="p-3">{trx.amount.toLocaleString("id-ID")}</td>
                  <td className="p-3 space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(trx)}
                    >
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showForm && (
            <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">
                  {formData.id ? "Edit Transaksi" : "Tambah Transaksi"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-sm">Tanggal</label>
                    <input
                      name="transaction_date"
                      type="date"
                      value={formData.transaction_date}
                      onChange={handleFormChange}
                      className="border p-2 rounded w-full text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Jenis</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleFormChange}
                      className="border p-2 rounded w-full text-sm"
                      required
                    >
                      <option value="">Pilih</option>
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm">Kategori</label>
                    <select
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleFormChange}
                      className="border p-2 rounded w-full text-sm"
                      required
                    >
                      <option value="">Pilih</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm">Akun</label>
                    <select
                      name="account_id"
                      value={formData.account_id}
                      onChange={handleFormChange}
                      className="border p-2 rounded w-full text-sm"
                      required
                    >
                      <option value="">Pilih</option>
                      {accounts.map((acc) => (
                        <option key={acc.id} value={acc.id}>
                          {acc.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm">Nominal</label>
                    <input
                      name="amount"
                      type="number"
                      value={formData.amount}
                      onChange={handleFormChange}
                      className="border p-2 rounded w-full text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Deskripsi</label>
                    <input
                      name="description"
                      type="text"
                      value={formData.description}
                      onChange={handleFormChange}
                      className="border p-2 rounded w-full text-sm"
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setFormData({
                          id: null,
                          transaction_date: "",
                          type: "",
                          category_id: "",
                          account_id: "",
                          amount: "",
                          description: "",
                        });
                      }}
                      className="px-4 py-2 border rounded text-sm"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
                    >
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
