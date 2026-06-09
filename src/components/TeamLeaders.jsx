import React, { useEffect, useState } from "react";
import { fetchTeamLeaders } from "../api/footballApi";

export default function TeamLeaders({ teamId }) {
  const [leaders, setLeaders] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!teamId) return;

    fetchTeamLeaders(teamId)
      .then((data) => {
        setLeaders(data);
        setError("");
      })
      .catch((error) => {
        console.error(error);
        setError("Could not load team leaders.");
      });
  }, [teamId]);

  if (error) {
    return <p className="mt-8 text-rose-600">{error}</p>;
  }

  if (!leaders) {
    return null;
  }

  return (
    <section className="mt-10">
      <h3 className="h2 mb-4">Team Leaders</h3>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm text-center">
          <div className="text-2xl mb-2">⚽</div>
          <h4 className="font-semibold">Top Goalscorer</h4>
          <p className="font-medium">
            {leaders.topGoalscorer?.playerName}
          </p>
          <p className="text-slate-500">
            {leaders.topGoalscorer?.goals} Goals
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm text-center">
          <div className="text-2xl mb-2">🎯</div>
          <h4 className="font-semibold">Top Assists</h4>
          <p className="font-medium">
            {leaders.topAssister?.playerName}
          </p>
          <p className="text-slate-500">
            {leaders.topAssister?.assists} Assists
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm text-center">
          <div className="text-2xl mb-2">🛡️</div>
          <h4 className="font-semibold">Most Interceptions</h4>
          <p className="font-medium">
            {leaders.mostInterceptions?.playerName}
          </p>
          <p className="text-slate-500">
            {leaders.mostInterceptions?.interceptions} Interceptions
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm text-center">
          <div className="text-2xl mb-2">⭐</div>
          <h4 className="font-semibold">Highest Rated</h4>
          <p className="font-medium">
            {leaders.highestRated?.playerName}
          </p>
          <p className="text-slate-500">
            Rating {leaders.highestRated?.rating}
          </p>
        </div>
      </div>
    </section>
  );
}