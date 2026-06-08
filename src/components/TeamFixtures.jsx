// TeamFixtures.jsx

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchFixturesByTeam,
  fetchGoalEventsByFixture,
} from "../api/footballApi";


const TeamFixtures = () => {
  const { teamId } = useParams();
  const [teamFixtures, setTeamFixtures] = useState([]);
  const [error, setError] = useState("");
  const [goalEventsByFixture, setGoalEventsByFixture] = useState({});

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        if (!teamId) return;

        const data = await fetchFixturesByTeam(teamId);
        const list = data.items || [];

        const safeSorted = [...list].sort((a, b) => {
          const ad = a.fixtureDate ? new Date(a.fixtureDate).getTime() : Infinity;
          const bd = b.fixtureDate ? new Date(b.fixtureDate).getTime() : Infinity;
          return ad - bd;
        });

        if (!ignore) {
          setTeamFixtures(safeSorted);
          setError("");
        }
      } catch (e) {
        if (!ignore) {
          setError("Could not load fixtures.");
          console.error(e);
        }
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [teamId]);

  useEffect(() => {
    const loadGoalEvents = async () => {
      const finishedFixtures = teamFixtures.filter(isFinished);

      const eventsMap = {};

      for (const fixture of finishedFixtures) {
        const data = await fetchGoalEventsByFixture(fixture.fixtureId);
        eventsMap[fixture.fixtureId] = data.items || [];
      }

      setGoalEventsByFixture(eventsMap);
    };

    if (teamFixtures.length > 0) {
      loadGoalEvents();
    }
  }, [teamFixtures]);

  const isFinished = (f) => {
    const short = f.statusShort ?? "";
    const long = (f.statusLong ?? "").toLowerCase();

    return ["FT", "AET", "PEN"].includes(short) || long.includes("finished");
  };

  const isUpcoming = (f) => {
    const t = f.fixtureDate ? new Date(f.fixtureDate).getTime() : NaN;
    return Number.isFinite(t) && t > Date.now() && !isFinished(f);
  };

  const isHomeGame = (f) => {
    return Number(f.homeTeamId) === Number(teamId);
  };

  const getOpponent = (f) => {
    return isHomeGame(f) ? f.awayTeamName : f.homeTeamName;
  };

  const getHomeAwayLabel = (f) => {
    return isHomeGame(f) ? "HOME" : "AWAY";
  };

  const getVsOrAt = (f) => {
    return isHomeGame(f) ? "vs" : "@";
  };

  const getResult = (f) => {
    if (!isFinished(f)) return null;

    const homeGoals = Number(f.goalsHome);
    const awayGoals = Number(f.goalsAway);

    if (homeGoals === awayGoals) return "D";

    const teamWonHome = isHomeGame(f) && homeGoals > awayGoals;
    const teamWonAway = !isHomeGame(f) && awayGoals > homeGoals;

    return teamWonHome || teamWonAway ? "W" : "L";
  };

  const resultBadgeClass = (result) => {
    if (result === "W") return "bg-emerald-100 text-emerald-700";
    if (result === "D") return "bg-amber-100 text-amber-700";
    if (result === "L") return "bg-red-100 text-red-700";
    return "bg-slate-100 text-slate-700";
  };

  const fmtDateTime = (iso) => {
    if (!iso) return "TBD";
    const t = new Date(iso);
    return Number.isNaN(t.getTime()) ? "TBD" : t.toLocaleString();
  };

  const results = useMemo(() => {
    const arr = teamFixtures.filter(isFinished);

    return arr.sort((a, b) => {
      const ad = a.fixtureDate ? new Date(a.fixtureDate).getTime() : -Infinity;
      const bd = b.fixtureDate ? new Date(b.fixtureDate).getTime() : -Infinity;
      return bd - ad;
    });
  }, [teamFixtures]);

  const upcoming = useMemo(() => {
    const arr = teamFixtures.filter(isUpcoming);

    return arr.sort((a, b) => {
      const ad = a.fixtureDate ? new Date(a.fixtureDate).getTime() : Infinity;
      const bd = b.fixtureDate ? new Date(b.fixtureDate).getTime() : Infinity;
      return ad - bd;
    });
  }, [teamFixtures]);

  const nextUpcomingId = useMemo(
    () => (upcoming.length ? upcoming[0]?.fixtureId ?? null : null),
    [upcoming]
  );

  const cardClass = (f) => {
    if (isFinished(f)) return "bg-white border border-slate-200";
    if ((f.fixtureId ?? null) === nextUpcomingId) {
      return "bg-blue-50 border border-blue-200";
    }
    return "bg-white border border-slate-200";
  };

  const badgeText = (f) => {
    if (isFinished(f)) return "Finished";
    if ((f.fixtureId ?? null) === nextUpcomingId) return "Next";
    return "Upcoming";
  };

  if (error) return <p className="mt-8 text-rose-600">{error}</p>;

  if (!teamFixtures.length) {
    return (
      <p className="mt-8 text-slate-600">
        No fixtures found for this team.
      </p>
    );
  }

  const FixtureGrid = ({ data }) => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((f, i) => {
        const id = f.fixtureId ?? i;
        const opponent = getOpponent(f) ?? "Opponent";
        const homeAwayLabel = getHomeAwayLabel(f);
        const vsOrAt = getVsOrAt(f);
        const dateStr = fmtDateTime(f.fixtureDate);
        const finished = isFinished(f);
        const result = getResult(f);

        const goalsHome = Number.isFinite(f.goalsHome) ? f.goalsHome : 0;
        const goalsAway = Number.isFinite(f.goalsAway) ? f.goalsAway : 0;
        const score = `${goalsHome} - ${goalsAway}`;

        return (
          <div key={id} className={`rounded-lg p-4 shadow-sm ${cardClass(f)}`}>
            <div className="flex items-start justify-between gap-2 mb-3">
              <span className="text-[10px] font-semibold tracking-wide px-2 py-1 rounded bg-slate-100 text-slate-700">
                {homeAwayLabel}
              </span>

              <span className="text-[10px] sm:text-xs px-2 py-1 rounded bg-black/5">
                {badgeText(f)}
              </span>
            </div>

            <h4 className="h4 leading-snug text-center">
              <span className="text-slate-500 mr-1">{vsOrAt}</span>
              {opponent}
            </h4>

            {finished ? (
              <>
                <div className="mt-3 flex items-center justify-center gap-2">
                  {result && (
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded ${resultBadgeClass(
                        result
                      )}`}
                    >
                      {result}
                    </span>
                  )}

                  <span className="text-sm sm:text-base font-semibold text-slate-900">
                    {score}
                  </span>
                </div>

                <div className="text-xs sm:text-sm text-slate-700 text-center mt-1">
                  {dateStr}
                </div>

                {goalEventsByFixture[id]?.length > 0 && (
                  <details className="mt-3 text-xs text-slate-600 border-t border-slate-100 pt-2">
                    <summary className="cursor-pointer font-semibold text-slate-700 text-center">
                      Scorers ({goalEventsByFixture[id].length})
                    </summary>

                    <div className="mt-2 space-y-2 text-left">
                      {goalEventsByFixture[id].map((event) => (
                        <div key={event.id}>
                          <span className="font-semibold text-slate-700">
                            {event.teamName}:
                          </span>{" "}
                          ⚽ {event.playerName}
                          {event.eventTime ? ` ${event.eventTime}'` : ""}
                          {event.extraTime ? `+${event.extraTime}` : ""}

                          {event.assistName && (
                            <div className="ml-4 text-[11px] text-slate-500">
                              Assist: {event.assistName}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </>
            ) : (
              <div className="mt-3 text-xs sm:text-sm text-slate-700 text-center">
                {dateStr}
              </div>
            )}

            <div className="mt-2 text-[11px] sm:text-xs text-slate-500 text-center">
              {f.leagueName ?? "League"}
              {f.leagueCountry ? ` · ${f.leagueCountry}` : ""}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="mt-8">
      <div className="mb-6 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
        <span className="font-semibold text-slate-700">Key:</span>

        <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 font-semibold">
          W = Win
        </span>

        <span className="px-2 py-1 rounded bg-amber-100 text-amber-700 font-semibold">
          D = Draw
        </span>

        <span className="px-2 py-1 rounded bg-red-100 text-red-700 font-semibold">
          L = Loss
        </span>

        <span className="px-2 py-1 rounded bg-slate-100 text-slate-700 font-semibold">
          vs = Home
        </span>

        <span className="px-2 py-1 rounded bg-slate-100 text-slate-700 font-semibold">
          @ = Away
        </span>
      </div>

      {upcoming.length > 0 && (
        <section className="mb-8">
          <h4 className="h2 mb-4">Upcoming Fixtures</h4>
          <FixtureGrid data={upcoming} />
        </section>
      )}

      {results.length > 0 && (
        <section>
          <h4 className="h2 mb-4">Results</h4>
          <FixtureGrid data={results} />
        </section>
      )}
    </div>
  );
};

export default TeamFixtures;