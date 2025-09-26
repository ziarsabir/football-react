import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/hero.png')" }}
    >
      {/* Dark overlay for general readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* Soft gradient from bottom to fade pitch */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent z-0"></div>

      {/* Compact glass content box */}
      <div className="relative z-10 text-center px-6 md:px-8 max-w-2xl backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fadeInUp text-white leading-tight sm:leading-snug drop-shadow-md">
          The Home of Premier League
        </h1>

        <p className="text-lg md:text-xl mb-4 opacity-0 animate-fadeInUp animation-delay-500 text-white leading-relaxed drop-shadow-md">
          Latest results, fixtures, and team updates every week
        </p>

        <p className="text-base md:text-lg mb-4 opacity-0 animate-fadeInUp animation-delay-700 text-gray-100 drop-shadow-lg leading-relaxed max-w-prose mx-auto">
          This platform delivers real-time Premier League updates using verified sources like <strong>ESPN</strong>, <strong>BBC Sport</strong>, and <strong>Sky Sports News</strong> through an integrated RSS feed. Whether you're after fixtures, stats, or team news – you’re in safe hands.
        </p>

        <button
          onClick={() => navigate("/standings")}
          className="px-8 py-3 rounded-lg shadow-lg font-semibold bg-gradient-to-b from-slate-50 to-slate-100 text-black hover:scale-105 transition-transform duration-300"
        >
          View Full League Table
        </button>
      </div>
    </section>
  );
}

export default Hero;