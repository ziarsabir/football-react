import React, { useEffect, useState } from "react";
import { fetchPremierLeagueLiveFixtures } from "../api/footballApi";

function StatusChip({ status, elapsed }) {
  const live = status?.toLowerCase().includes("live") || elapsed;
  const finished = status?.toLowerCase().includes("finished");

  const color = live
    ? "bg-green-100 text-green-700"
    : finished
    ? "bg-slate-200 text-slate-700"
    : "bg-yellow-100 text-yellow-700";

  return (
    <span className={`inline-block text-xs px-2 py-1 rounded ${color}`}>
      {status}
      {elapsed ? ` (${elapsed}')` : ""}
    </span>
  );
}

export default function Fixtures() {
  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    fetchPremierLeagueLiveFixtures().then((data) => {
      // My REST API returns the live fixtures inside the "items" array.
      setFixtures(data.items || []);
    });
  }, []);

  return (
    <div className="container mx-auto px-4 my-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Live Fixtures
      </h1>

      {fixtures.length === 0 ? (
        <p className="text-center text-slate-500">
          Live updates – new fixtures added weekly.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fixtures.map((f) => (
            <div
              key={f.fixtureId}
              className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {f.homeTeamName}{" "}
                  <span className="opacity-60">vs</span>{" "}
                  {f.awayTeamName}
                </h3>

                <StatusChip
                  status={f.statusLong}
                  elapsed={f.elapsed}
                />
              </div>

              <div className="mt-3 text-slate-700">
                <div>
                  <span className="font-semibold">Score:</span>{" "}
                  {f.goalsHome} - {f.goalsAway}
                </div>

                <div className="text-sm text-slate-500 mt-1">
                  League: {f.leagueName}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}