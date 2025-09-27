import React, { useEffect, useState } from "react";
import { fetchPremierLeagueLiveFixtures } from "../api/footballApi";

const LiveFixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPremierLeagueLiveFixtures()
      .then(data => {
        setFixtures(data?.response || []);
      })
      .catch(err => {
        console.error("Error fetching live fixtures:", err);
        setFixtures([]); // fallback to empty
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading live fixtures...</p>;

  // Show this when no fixtures found
  if (fixtures.length === 0) {
    return <p className="text-center text-slate-600">Live updates – new fixtures added weekly.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {fixtures.map((f, i) => (
        <div key={i} className="fixture-card rounded-xl border border-slate-200 bg-white p-4 shadow">
          <h3 className="text-lg font-semibold mb-2">
            {f.teams.home.name} vs {f.teams.away.name}
          </h3>
          <p><strong>Score:</strong> {f.goals.home} - {f.goals.away}</p>
          <p><strong>Status:</strong> {f.fixture.status.long} ({f.fixture.status.elapsed}' mins)</p>
          <p><strong>League:</strong> {f.league.name} ({f.league.country})</p>
        </div>
      ))}
    </div>
  );
};

export default LiveFixtures;