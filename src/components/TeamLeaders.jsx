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

  const LeaderCard = ({ icon, title, player, stat }) => (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm text-center">
      <div className="text-2xl mb-2">{icon}</div>

      <h4 className="font-semibold">{title}</h4>

      {player?.photo && (
        <img
          src={player.photo}
          alt={player.playerName}
          className="w-14 h-14 rounded-full object-cover mx-auto my-2 bg-slate-100"
        />
      )}

      <p className="font-medium">{player?.playerName || "N/A"}</p>
      <p className="text-slate-500">{stat}</p>
    </div>
  );

  return (
    <section className="mt-10">
      <h3 className="h2 mb-4">Team Leaders</h3>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <LeaderCard
          icon="⚽"
          title="Top Goalscorer"
          player={leaders.topGoalscorer}
          stat={`${leaders.topGoalscorer?.goals ?? 0} Goals`}
        />

        <LeaderCard
          icon="🎯"
          title="Top Assists"
          player={leaders.topAssister}
          stat={`${leaders.topAssister?.assists ?? 0} Assists`}
        />

        <LeaderCard
          icon="🛡️"
          title="Most Interceptions"
          player={leaders.mostInterceptions}
          stat={`${leaders.mostInterceptions?.interceptions ?? 0} Interceptions`}
        />

        <LeaderCard
          icon="⭐"
          title="Highest Rated"
          player={leaders.highestRated}
          stat={`Rating ${leaders.highestRated?.rating ?? "N/A"}`}
        />
      </div>
    </section>
  );
}