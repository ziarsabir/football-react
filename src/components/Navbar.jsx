import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/premier-league-stats.png";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const base =
    "px-4 py-2 rounded-full text-base font-semibold transition hover:bg-white/10";

  const active = ({ isActive }) =>
    isActive ? `${base} bg-white/15` : base;

  const mobileLink =
    "block rounded-md px-4 py-2 text-base font-semibold hover:bg-white/10";

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-black via-orange-900 to-black text-white shadow">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-1">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center hover:opacity-90 transition-opacity duration-300"
            aria-label="Go to homepage"
          >
            <img
              src={logo}
              alt="Premier League Stats"
              className="h-[115px] w-auto object-contain transition-transform duration-300 hover:scale-105 sm:h-[100px]"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-3 sm:flex">
            <li>
              <NavLink to="/" className={active} end>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/standings" className={active}>
                Standings
              </NavLink>
            </li>

            <li>
              <NavLink to="/fixtures" className={active}>
                Live Fixtures
              </NavLink>
            </li>

            <li>
              <NavLink to="/teams" className={active}>
                Teams
              </NavLink>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-white/10 sm:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((currentOpen) => !currentOpen)}
          >
            {open ? (
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="border-t border-white/10 bg-black/95 backdrop-blur sm:hidden">
          <ul className="mx-auto max-w-6xl space-y-2 px-4 py-3">
            <li>
              <NavLink
                to="/"
                end
                className={mobileLink}
                onClick={() => setOpen(false)}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/standings"
                className={mobileLink}
                onClick={() => setOpen(false)}
              >
                Standings
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/fixtures"
                className={mobileLink}
                onClick={() => setOpen(false)}
              >
                Live Fixtures
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/teams"
                className={mobileLink}
                onClick={() => setOpen(false)}
              >
                Teams
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}