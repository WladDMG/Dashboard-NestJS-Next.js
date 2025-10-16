"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Erro ao deslogar:", err);
    }
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Não autenticado");

        const data = await res.json();
        setUserEmail(data.email);
      } catch (err) {
        console.error(err);
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Área principal */}
      <div className="flex-1 flex flex-col">
        <Header onLogout={handleLogout} userEmail={userEmail} />

        <main className="flex-1 p-6 overflow-y-auto">
          {loading ? (
            <div className="animate-pulse bg-gray-200 h-40 rounded-xl" />
          ) : (
            <div className="bg-white p-8 rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg">
              <h2 className="text-2xl font-semibold mb-3">
                Bem-vindo, {userEmail}!
              </h2>
              <p className="text-gray-600">
                Esta é sua dashboard inicial. Aqui você pode adicionar gráficos,
                relatórios e muito mais.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
