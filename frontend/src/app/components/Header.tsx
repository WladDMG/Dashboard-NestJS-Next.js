"use client";

interface HeaderProps {
  userEmail: string;
  onLogout: () => void;
}

export default function Header({ userEmail, onLogout }: HeaderProps) {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 border-b border-gray-200">
      <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{userEmail}</span>
        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-4 py-1.5 rounded-md hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
