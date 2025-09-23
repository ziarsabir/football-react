import React from "react";
import { Link } from "react-router-dom";
import SportsNews from '../components/SportsNews.jsx'

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Welcome to Premier League Stats
        </h1>
        <p className="mt-3 text-slate-600 max-w-xl mx-auto">
          Live tables, fixtures and team info at a glance. Pick a section below.
        </p>
      </section>

      {/* Quick links */}
      <section className="container mx-auto px-4 pb-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { to: "/standings", label: "League Standings", emoji: "📊" },
            { to: "/fixtures", label: "Live Fixtures", emoji: "⏱️" },
            { to: "/teams", label: "Team Directory", emoji: "🏟️" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group rounded-xl bg-white shadow hover:shadow-lg transition p-6 text-center"
            >
              <div className="text-3xl mb-2">{item.emoji}</div>
              <div className="font-semibold text-slate-900">{item.label}</div>
              <div className="text-slate-500 text-sm mt-1">
                Tap to explore →
              </div>
              <div className="mt-3 h-1 w-0 group-hover:w-full bg-blue-600 transition-all" />
            </Link>
          ))}
        </div>

        <SportsNews/> 
        
      </section>
    </div>
  );
}