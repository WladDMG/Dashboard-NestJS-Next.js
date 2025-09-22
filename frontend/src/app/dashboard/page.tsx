"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string>("");

  // ----------------------
  // Função de logout
  // ----------------------
  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include", // envia cookie HTTP-only
      });
    } catch (err) {
      console.error("Erro ao deslogar:", err);
    }
    // Redireciona para login
    window.location.href = "/login";
  };

  // ----------------------
  // Carregar dados do usuário
  // ----------------------
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          credentials: "include", // envia cookie HTTP-only
        });

        if (!res.ok) {
          // Se não autorizado, redireciona para login
          throw new Error("Não autenticado");
        }

        const data = await res.json();
        setUserEmail(data.email); // atualiza estado com e-mail do usuário
      } catch (err) {
        console.error(err);
        window.location.href = "/login";
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      {/* Conteúdo principal */}
      <main>
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl text-gray-700 font-semibold mb-4">
            Bem-vindo, {userEmail}!
          </h2>
          <p className="text-gray-700">
            Esta é sua dashboard inicial. Aqui você pode adicionar gráficos, relatórios e muito mais.
          </p>
        </div>
      </main>
    </div>
  );
}
