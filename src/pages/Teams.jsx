import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTeamsByLeague } from "../api/footballApi";
import { fetchTransfersByTeam } from "../api/footballApi"; 


export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetchTeamsByLeague(39, 2025).then((data) => setTeams(data.items || []));
  }, []);

  const filtered = useMemo(() => {
    const searchTerm = q.trim().toLowerCase(); 

    if (!searchTerm) return teams; 

    return teams.filter((t) => 
      t.teamName.toLowerCase().includes(searchTerm)
    );
  }, [q, teams]);

  return (
    <div className="container mx-auto px-4 my-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Teams</h1>
    

      <div className="max-w-md mx-auto mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search teams…"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-slate-500">No teams found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((t) => (
            <Link
              to={`/teams/${t.teamId}`}
              key={t.teamId}
              className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl hover:-translate-y-0.5 transition text-center"
            >
              <img
                src={t.teamLogo}
                alt={t.teamName}
                className="w-16 h-16 mx-auto mb-3"
              />
              <p className="font-semibold text-slate-800">{t.teamName}</p>
              <p className="text-xs text-slate-500 mt-1">{t.country}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}