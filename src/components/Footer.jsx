import React from "react";

export default function Footer() {
  return (
    <footer className="mt-12 bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Premier League Stats App</p>
        <div className="text-sm opacity-80">
          Built with React + Tailwind · Data via API-Football
        </div>
      </div>
    </footer>
  );
}
