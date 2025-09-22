"use client";

export default function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("token"); // ou apagar cookie
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Sair
    </button>
  );
}
