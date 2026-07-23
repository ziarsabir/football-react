import React, { useEffect, useState } from "react";
import { fetchStandings } from "../api/footballApi";
import { Link } from "react-router-dom";

const StandingsTable = () => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    fetchStandings().then((data) => {
      const table = Array.isArray(data) ? data : data.items || [];
      setStandings(table);
    });
  }, []);

  const renderForm = (formStr) => {
    if (!formStr) return null;

    const lastFive = formStr
      .replace(/[^WDL]/g, "")
      .slice(-5)
      .split("");

    const dotClass = (result) =>
      result === "W"
        ? "bg-green-500"
        : result === "D"
        ? "bg-amber-500"
        : "bg-rose-500";

    return (
      <div className="flex items-center justify-end gap-1">
        {lastFive.map((result, index) => (
          <span
            key={index}
            title={
              result === "W"
                ? "Win"
                : result === "D"
                ? "Draw"
                : "Loss"
            }
            className={`inline-block h-2.5 w-2.5 rounded-full ${dotClass(
              result
            )}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[560px] border-collapse">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="w-12 px-3 py-3 text-left">#</th>

            <th className="min-w-[180px] px-3 py-3 text-left">
              Team
            </th>

            <th className="px-2 py-3 text-right">P</th>
            <th className="px-2 py-3 text-right">W</th>

            <th className="hidden px-2 py-3 text-right sm:table-cell">
              D
            </th>

            <th className="hidden px-2 py-3 text-right sm:table-cell">
              L
            </th>

            <th className="hidden px-2 py-3 text-right md:table-cell">
              GF
            </th>

            <th className="hidden px-2 py-3 text-right md:table-cell">
              GA
            </th>

            <th className="hidden px-2 py-3 text-right lg:table-cell">
              GD
            </th>

            <th className="px-3 py-3 text-right">Pts</th>

            <th className="hidden px-3 py-3 text-right lg:table-cell">
              Form
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {standings.map((row, index) => {
            const played = row.played ?? 0;
            const win = row.win ?? 0;
            const draw = row.draw ?? 0;
            const lose = row.lose ?? 0;
            const goalsFor = row.goalsFor ?? 0;
            const goalsAgainst = row.goalsAgainst ?? 0;
            const goalDifference =
              row.goalsDiff ?? goalsFor - goalsAgainst;

            return (
              <tr
                key={row.teamId}
                className={
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-slate-50/70"
                }
              >
                <td className="px-3 py-3 tabular-nums">
                  {row.rank}
                </td>

                <td className="px-3 py-3">
                  <Link
                    to={`/teams/${row.teamId}`}
                    className="flex min-w-0 items-center gap-3 hover:underline"
                  >
                    <img
                      src={row.teamLogo}
                      alt={`${row.teamName} logo`}
                      className="h-7 w-7 shrink-0 object-contain"
                    />

                    <span className="min-w-0 font-medium text-slate-800">
                      {row.teamName}
                    </span>
                  </Link>
                </td>

                <td className="px-2 py-3 text-right tabular-nums">
                  {played}
                </td>

                <td className="px-2 py-3 text-right tabular-nums">
                  {win}
                </td>

                <td className="hidden px-2 py-3 text-right tabular-nums sm:table-cell">
                  {draw}
                </td>

                <td className="hidden px-2 py-3 text-right tabular-nums sm:table-cell">
                  {lose}
                </td>

                <td className="hidden px-2 py-3 text-right tabular-nums md:table-cell">
                  {goalsFor}
                </td>

                <td className="hidden px-2 py-3 text-right tabular-nums md:table-cell">
                  {goalsAgainst}
                </td>

                <td className="hidden px-2 py-3 text-right font-medium tabular-nums lg:table-cell">
                  {goalDifference}
                </td>

                <td className="px-3 py-3 text-right font-semibold tabular-nums">
                  {row.points}
                </td>

                <td className="hidden px-3 py-3 lg:table-cell">
                  {renderForm(row.form)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;