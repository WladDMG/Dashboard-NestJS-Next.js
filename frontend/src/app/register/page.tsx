"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      alert(errorData.message || "Erro ao registrar");
      return;
    }

    alert("Usuário registrado com sucesso!");
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form className="w-96 p-6 bg-white shadow-md rounded-lg space-y-4" onSubmit={handleRegister}>
        <h1 className="text-xl font-bold text-gray-900">Registrar</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-600 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 border border-gray-600 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirmar senha"
          className="w-full p-2 border border-gray-600 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-green-700"
        >
          Registrar
        </button>

        <p className="text-sm text-gray-700 text-center">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  );
}
