"use client";

import { useState } from "react";
import { Home, BarChart3, Settings } from "lucide-react";

export default function Sidebar() {
  const [active, setActive] = useState("home");

  const links = [
    { id: "home", label: "Início", icon: <Home size={18} /> },
    { id: "analytics", label: "Relatórios", icon: <BarChart3 size={18} /> },
    { id: "settings", label: "Configurações", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="hidden sm:flex flex-col w-64 bg-white border-r border-gray-200 p-4">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800">App Factory</h2>
      </div>

      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => setActive(link.id)}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              active === link.id
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {link.icon}
            {link.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
