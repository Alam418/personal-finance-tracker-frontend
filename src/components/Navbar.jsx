"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState({ username: "Loading..." });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3005/api/v1/auth/me", {
        withCredentials: true,
      })
      .then((res) => setUser(res.data))
      .catch((err) => {
        const status = err.response?.status;
        const message = err.response?.data?.message;

        console.error("AUTH ME ERROR:", status, message);

        if (status === 401 && message?.toLowerCase().includes("expired")) {
          localStorage.removeItem("token");
          setUser({ username: "Guest" });
        }
      });
  }, []);

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">💰 MyFinance</h1>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
        >
          <span className="text-sm text-gray-700 font-medium">
            {user.username}
          </span>
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-md z-50">
            <a
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Edit Profile
            </a>
            <a
              href="#"
              onClick={() => {
                axios
                  .post(
                    "http://localhost:3005/api/v1/auth/logout",
                    {},
                    { withCredentials: true }
                  )
                  .then(() => {
                    window.location.href = "/login";
                  })
                  .catch(() => {
                    alert("Gagal logout");
                  });
              }}
              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
