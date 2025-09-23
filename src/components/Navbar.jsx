import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/premier-league-stats.png";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const base =
    "px-3 py-2 rounded-full text-sm font-medium transition hover:bg-white/10";
  const active = ({ isActive }) =>
    isActive ? `${base} bg-white/15` : base;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-black via-orange-900 to-black text-white shadow">
      <div className="mx-auto max-w-6xl px-4">
        {/* remove fixed heights; pad instead so logo sets the height */}
        <div className="flex items-center justify-between py-2 sm:py-3">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            {/* badge wrapper improves contrast & perceived size */}
            <div className="shrink-0 rounded-lg bg-white/10 p-1.5 ring-1 ring-white/15">
              <img
                src={logo}
                alt="Premier League Logo"
                className="
                  h-[114px] w-[114px]           /* BIG on mobile */
                  sm:h-[104px] sm:w-[104px]     /* slightly smaller on desktop */
                  object-contain
                "
              />
            </div>
            <span className="hidden sm:inline text-lg font-semibold tracking-tight">
              Premier League Stats
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden sm:flex items-center gap-1">
            <li><NavLink to="/" className={active} end>Home</NavLink></li>
            <li><NavLink to="/standings" className={active}>Standings</NavLink></li>
            <li><NavLink to="/fixtures" className={active}> Live Fixtures</NavLink></li>
            <li><NavLink to="/teams" className={active}>Teams</NavLink></li>
          </ul>

          {/* Mobile toggle (SVG = crisp) */}
          <button
            className="sm:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-white/10"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            {open ? (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M6 6L18 18M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden border-t border-white/10 bg-blue-900/95 backdrop-blur">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            <li><NavLink to="/" end className="block rounded-md px-3 py-2 hover:bg-white/10" onClick={() => setOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/standings" className="block rounded-md px-3 py-2 hover:bg-white/10" onClick={() => setOpen(false)}>Standings</NavLink></li>
            <li><NavLink to="/fixtures" className="block rounded-md px-3 py-2 hover:bg-white/10" onClick={() => setOpen(false)}>Fixtures</NavLink></li>
            <li><NavLink to="/teams" className="block rounded-md px-3 py-2 hover:bg-white/10" onClick={() => setOpen(false)}>Teams</NavLink></li>
          </ul>
        </div>
      )}
    </nav>
  );
}