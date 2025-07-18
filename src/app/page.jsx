"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:3005/api/v1/auth/me", { withCredentials: true })
      .then(() => {
        router.push("/dashboard");
      })
      .catch(() => {
        router.push("/login");
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-blue-600">
          Personal Finance Tracker
        </h1>
        <p className="text-gray-600">Welcome! Checking session...</p>
      </div>
    </div>
  );
}
