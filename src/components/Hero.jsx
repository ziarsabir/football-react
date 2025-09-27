// components/Hero.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const scrollToNews = () => {
    const anchor = document.getElementById("news-anchor");
    if (anchor) {
      const yOffset = -100;
      const y =
        anchor.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/hero.png')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* Gradient fade at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent z-0"></div>

      {/* Content Box */}
      <div className="relative z-10 text-center px-6 md:px-8 max-w-2xl backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl -translate-y-20">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4 animate-fadeInUp text-white leading-tight drop-shadow-md">
          The Home of Premier League
        </h1>

        <p className="text-base md:text-lg mb-4 text-white leading-relaxed drop-shadow-md">
          Latest results, fixtures, and team updates every week
        </p>

        <p className="text-sm md:text-base mb-6 text-gray-100 leading-relaxed max-w-prose mx-auto drop-shadow-lg">
          This platform delivers real-time Premier League updates using verified
          sources like <strong>ESPN</strong>, <strong>BBC Sport</strong>, and{" "}
          <strong>Sky Sports News</strong>. Whether you're after fixtures,
          stats, or team news – you’re in safe hands.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/standings")}
            className="px-6 py-3 rounded-lg shadow-lg font-semibold bg-white text-black hover:bg-slate-100 transition-transform duration-300"
          >
            View Full League Table
          </button>

          <button
            onClick={scrollToNews}
            className="px-6 py-3 rounded-lg shadow-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-transform duration-300"
          >
            Read Latest News
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;