"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // ⚠️ importante para enviar/receber cookie HTTP-only
    });

    if (!res.ok) {
      alert("Credenciais inválidas");
      return;
    }

    alert("Login realizado com sucesso!");
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form className="w-96 p-6 bg-white shadow-md rounded-lg space-y-4" onSubmit={handleLogin}>
        <h1 className="text-xl font-bold text-gray-900">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-600 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 border border-gray-600 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>

        <p className="text-sm text-gray-700 text-center">
          Não tem uma conta?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Registrar
          </Link>
        </p>
      </form>
    </div>
  );
}
