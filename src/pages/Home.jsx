// pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import SportsNews from "../components/SportsNews.jsx";
import Hero from "../components/Hero.jsx";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100">
      <Hero />

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
              <div className="mt-3 h-1 w-0 group-hover:w-full bg-slate-200 transition-all" />
            </Link>
          ))}
        </div>

        {/* Scroll anchor to fix scroll offset for "Read Latest News" */}
        <div id="news-anchor" className="pt-12 -mt-12" />

        <SportsNews />
      </section>
    </div>
  );
}