import React, { useEffect, useState } from "react";
import { fetchStandings } from "../api/footballApi";
import { Link } from "react-router-dom";

const StandingsTable = () => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    fetchStandings().then((data) => {
      const table = data.response?.[0]?.league?.standings?.[0] || [];
      setStandings(table);
    });
  }, []);

  // helper to render compact form (last 5)
  const renderForm = (formStr) => {
    if (!formStr) return null;
    const lastFive = formStr.replace(/[^WDL]/g, "").slice(-5).split("");
    const dotClass = (c) =>
      c === "W"
        ? "bg-green-500"
        : c === "D"
        ? "bg-amber-500"
        : "bg-rose-500";
    return (
      <div className="flex items-center gap-1 justify-end">
        {lastFive.map((c, i) => (
          <span
            key={i}
            title={c === "W" ? "Win" : c === "D" ? "Draw" : "Loss"}
            className={`inline-block h-2.5 w-2.5 rounded-full ${dotClass(c)}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-slate-200 rounded-lg">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left">#</th>
            <th className="py-3 px-4 text-left">Team</th>
            <th className="py-3 px-2 text-right">P</th>
            <th className="py-3 px-2 text-right">W</th>
            <th className="py-3 px-2 text-right">D</th>
            <th className="py-3 px-2 text-right">L</th>
            <th className="py-3 px-2 text-right">GF</th>
            <th className="py-3 px-2 text-right">GA</th>
            <th className="py-3 px-2 text-right">GD</th>
            <th className="py-3 px-3 text-right">Pts</th>
            <th className="py-3 px-3 text-right">Form</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {standings.map((row, idx) => {
            const played = row?.all?.played ?? 0;
            const win = row?.all?.win ?? 0;
            const draw = row?.all?.draw ?? 0;
            const lose = row?.all?.lose ?? 0;
            const gf = row?.all?.goals?.for ?? 0;
            const ga = row?.all?.goals?.against ?? 0;
            const gd = row?.goalsDiff ?? (gf - ga);

            return (
              <tr
                key={row.team.id}
                className={idx % 2 ? "bg-slate-50/50" : "bg-white"}
              >
                <td className="py-2 px-4">{row.rank}</td>
                <td className="py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={row.team.logo} alt="" className="w-6 h-6" />
                    <span className="font-medium text-slate-800">
                      <Link
                        to={`/teams/${row.team.id}`}
                        className="hover:underline"
                      >
                        {row.team.name}
                      </Link>
                    </span>
                  </div>
                </td>

                <td className="py-2 px-2 text-right tabular-nums">{played}</td>
                <td className="py-2 px-2 text-right tabular-nums">{win}</td>
                <td className="py-2 px-2 text-right tabular-nums">{draw}</td>
                <td className="py-2 px-2 text-right tabular-nums">{lose}</td>
                <td className="py-2 px-2 text-right tabular-nums">{gf}</td>
                <td className="py-2 px-2 text-right tabular-nums">{ga}</td>
                <td className="py-2 px-2 text-right tabular-nums font-medium">
                  {gd}
                </td>
                <td className="py-2 px-3 text-right font-semibold tabular-nums">
                  {row.points}
                </td>
                <td className="py-2 px-3">{renderForm(row.form)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;