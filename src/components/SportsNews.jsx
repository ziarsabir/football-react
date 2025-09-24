// components/SportsNews.jsx
import React, { useEffect, useMemo, useState } from "react";

const SOURCES = [
  { key: "bbc", label: "BBC Football" },
  { key: "skysportsnews", label: "Sky Sports News" },
  { key: "espn", label: "ESPN Soccer" },
];

// UI dropdown list (display names must match server CLUB_TERMS keys)
const PL_CLUBS = [
  "All Clubs",
  "Arsenal",
  "Aston Villa",
  "Bournemouth",
  "Brentford",
  "Brighton",
  "Chelsea",
  "Crystal Palace",
  "Everton",
  "Fulham",
  "Ipswich",
  "Leeds United",
  "Leicester City",
  "Liverpool",
  "Manchester City",
  "Manchester United",
  "Newcastle United",
  "Nottingham Forest",
  "Southampton",
  "Tottenham Hotspur",
  "West Ham United",
  "Wolves"
];

export default function SportsNews() {
  // States
  const [source, setSource] = useState("bbc");
  const [plOnly, setPlOnly] = useState(true); // Premier League filter ON by default
  const [club, setClub] = useState("All Clubs");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [error, setError] = useState("");

  // Fetch when source / plOnly / club changes
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const topicQS = plOnly ? "&topic=premierleague" : "";
        const clubQS =
          plOnly && club && club !== "All Clubs"
            ? `&club=${encodeURIComponent(club)}`
            : "";

        const url = `https://football-backend-ish9.onrender.com/api/news?source=${source}${topicQS}${clubQS}`;

        const r = await fetch(url);
        const data = await r.json();
        if (!cancelled) setItems(Array.isArray(data?.items) ? data.items : []);
      } catch (e) {
        if (!cancelled) {
          setItems([]);
          setError("Couldn't load headlines right now.");
          console.error(e);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [source, plOnly, club]);

  // Client-side search (title + description)
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter((it) => {
      const hay =
        `${it.title || ""} ${String(it.description || "").replace(/<[^>]+>/g, " ")}`.toLowerCase();
      return hay.includes(term);
    });
  }, [q, items]);
  console.log("filtered items:", filtered.length);

  const fmtDate = (d) => {
    if (!d) return "";
    const t = new Date(d);
    return isNaN(t) ? "" : t.toLocaleString();
  };

  const getImage = (it) =>
    it?.image || it?.thumbnail || it?.enclosure?.url || null;

  return (
    <section className="container mx-auto px-4 py-6">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
        Latest Football News
      </h2>

      {/* Controls row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2 mb-4">
        {/* Source tabs */}
        <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 w-fit">
          {SOURCES.map((s, i) => {
            const active = source === s.key;
            return (
              <button
                key={i}
                onClick={() => setSource(s.key)}
                className={
                  "px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition " +
                  (active
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-700 hover:bg-slate-100")
                }
                aria-pressed={active}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* PL-only toggle */}
        <label className="flex items-center gap-2 sm:ml-2">
          <input
            type="checkbox"
            checked={plOnly}
            onChange={(e) => setPlOnly(e.target.checked)}
          />
          <span className="text-sm text-slate-700">Premier League only</span>
        </label>

        {/* Club dropdown (enabled when PL-only) */}
        <div className="sm:ml-2 w-full sm:w-auto">
          <select
            disabled={!plOnly}
            value={club}
            onChange={(e) => setClub(e.target.value)}
            className="w-full sm:w-64 rounded-xl border border-slate-300 bg-white/90 px-3 py-2 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:opacity-50"
          >
            {PL_CLUBS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Search box */}
        <div className="sm:ml-auto w-full sm:w-auto">
          <input
            placeholder="Search headlines…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full sm:w-72 rounded-xl border border-slate-300 bg-white/90 px-3 py-2 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>
      </div>

      {/* States */}
      {error && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 text-rose-700 px-4 py-3 mb-4">
          {error}
        </div>
      )}

      {loading ? (
        // Skeletons
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm animate-pulse"
            >
              <div className="h-40 w-full rounded-xl bg-slate-200 mb-3" />
              <div className="h-4 w-3/4 bg-slate-200 rounded mb-2" />
              <div className="h-3 w-1/3 bg-slate-200 rounded mb-3" />
              <div className="h-3 w-full bg-slate-200 rounded mb-1" />
              <div className="h-3 w-5/6 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-10 text-center text-slate-600">
          No headlines found.
        </div>
      ) : (
        // News grid
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((it, i) => {
            const img = getImage(it);
            const href = it?.link || it?.url || "#";
            const title = it?.title || "Untitled";
            const showSource = !!it?.source;
            const showDate = !!it?.pubDate;

            return (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-lg hover:-translate-y-0.5"
              >
                {/* Thumbnail */}
                {img ? (
                  <div className="mb-3 overflow-hidden rounded-xl">
                    <img
                      src={img}
                      alt=""
                      className="h-44 w-full object-cover transition group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="mb-3 h-2 w-10 rounded bg-gradient-to-r from-blue-600 to-indigo-600" />
                )}

                {/* Accent bar */}
                <div className="h-1 w-12 rounded bg-gradient-to-r from-blue-600 to-indigo-600 mb-2 opacity-80 group-hover:opacity-100" />

                {/* Title */}
                <h3 className="text-lg md:text-xl font-semibold leading-snug tracking-tight text-slate-900 group-hover:text-blue-700 line-clamp-2">
                  {title}
                </h3>

                {/* Meta */}
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                  {showSource && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 font-medium">
                      {it.source}
                    </span>
                  )}
                  {showDate && (
                    <span aria-label="published time" className="whitespace-nowrap">
                      {fmtDate(it.pubDate)}
                    </span>
                  )}
                </div>

                {/* Description */}
                {it?.description && (
                  <p
                    className="mt-3 text-sm text-slate-700 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: it.description }}
                  />
                )}
              </a>
            );
          })}
        </div>
      )}

      <p className="mt-6 text-xs text-slate-500">
        This site aggregates RSS feeds for informational purposes only. All rights remain with the original publishers.
      </p>
    </section>
  );
}
