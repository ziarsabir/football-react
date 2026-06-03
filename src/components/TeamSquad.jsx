import React, { useEffect, useMemo, useState } from "react";
import { fetchSquadByTeam } from "../api/footballApi";

export default function TeamSquad({ teamId }) {
  const [squad, setSquad] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!teamId) return;

    fetchSquadByTeam(teamId)
      .then((data) => {
        setSquad(data.items || []);
        setError("");
      })
      .catch((error) => {
        console.error(error);
        setSquad([]);
        setError("Could not load squad.");
      });
  }, [teamId]);

  const groupedSquad = useMemo(() => {
    return squad.reduce((groups, player) => {
      const position = player.position || "Other";

      if (!groups[position]) {
        groups[position] = [];
      }

      groups[position].push(player);

      return groups;
    }, {});
  }, [squad]);

  if (error) {
    return <p className="mt-8 text-rose-600">{error}</p>;
  }

  if (!squad.length) {
    return <p className="mt-8 text-slate-600">No squad found for this team.</p>;
  }

  const positionOrder = ["Goalkeeper", "Defender", "Midfielder", "Attacker", "Other"];

  return (
    <section className="mt-10">
      <h3 className="h2 mb-4">Squad</h3>

      <div className="space-y-6">
        {positionOrder.map((position) => {
          const players = groupedSquad[position];

          if (!players || players.length === 0) return null;

          return (
            <div key={position}>
              <h4 className="text-lg font-semibold text-slate-800 mb-3">
                {position}s
              </h4>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {players.map((player) => (
                  <div
                    key={player.playerId}
                    className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex items-center gap-3"
                  >
                    <img
                      src={player.photo}
                      alt={player.playerName}
                      className="w-12 h-12 rounded-full object-cover bg-slate-100"
                    />

                    <div>
                      <div className="font-semibold text-slate-800">
                        {player.playerName}
                      </div>

                      <div className="text-xs text-slate-500">
                        #{player.number || "—"} · Age {player.age || "—"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}