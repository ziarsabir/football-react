// TeamFixtures.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFixturesByTeam } from "../api/footballApi";

const TeamFixtures = () => {
  const { teamId } = useParams();
  const [teamFixtures, setTeamFixtures] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      try {
        if (!teamId) return;
        const data = await fetchFixturesByTeam(teamId);
        const list = Array.isArray(data?.response) ? data.response : [];
        const safeSorted = [...list].sort((a, b) => {
          const ad = a?.fixture?.date ? new Date(a.fixture.date).getTime() : Infinity;
          const bd = b?.fixture?.date ? new Date(b.fixture.date).getTime() : Infinity;
          return ad - bd;
        });
        if (!ignore) { setTeamFixtures(safeSorted); setError(""); }
      } catch (e) { if (!ignore) { setError("Could not load fixtures."); console.error(e); } }
    };
    load();
    return () => (ignore = true);
  }, [teamId]);

  const isFinished = (f) => {
    const short = f?.fixture?.status?.short ?? "";
    const long = (f?.fixture?.status?.long ?? "").toLowerCase();
    return ["FT", "AET", "PEN"].includes(short) || long.includes("finished");
  };


  const isUpcoming = (f) => {
    const t = f?.fixture?.date ? new Date(f.fixture.date).getTime() : NaN;
    return Number.isFinite(t) && t > Date.now() && !isFinished(f);
  };

  const fmtDateTime = (iso) => {
    if (!iso) return "TBD";
    const t = new Date(iso);
    return Number.isNaN(t.getTime()) ? "TBD" : t.toLocaleString();
  };

  //useMemo does NOT "pause" or "stop and wait"
  //it runs fully, computes the value, returns it, and finishes. 
  //it reuses the returned value on future renders unless teamFixtures changes 
  const results = useMemo(() => {
    //step 1: filter 
    const arr = teamFixtures.filter(isFinished);
    //step 2: sort AND return the final result once sorting is complete and sorted array becomes final result
    // SORT mutates the array in place and returns the same array. 
    // This is an INLINE version of the function 
    // The returned value from use useMemo is the sorted fixtures list. 
    return arr.sort((a, b) => {
      const ad = a?.fixture?.date ? new Date(a.fixture.date).getTime() : -Infinity;
      const bd = b?.fixture?.date ? new Date(b.fixture.date).getTime() : -Infinity;
      return bd - ad; //ONLY tells sort how to compare 2 items/does NOT return from useMemo()/comparison logic/ runs many times
    });
  }, [teamFixtures]);


//
  const upcoming = useMemo(() => {
    const arr = teamFixtures.filter(isUpcoming);
    return arr.sort((a, b) => {
      const ad = a?.fixture?.date ? new Date(a.fixture.date).getTime() : Infinity;
      const bd = b?.fixture?.date ? new Date(b.fixture.date).getTime() : Infinity;
      return ad - bd; // soonest first
    });
  }, [teamFixtures]);

  const nextUpcomingId = useMemo(
    () => (upcoming.length ? upcoming[0]?.fixture?.id ?? null : null),
    [upcoming]
  );

  const cardClass = (f) => {
    if (isFinished(f)) return "bg-emerald-50 border border-emerald-200";
    if ((f?.fixture?.id ?? null) === nextUpcomingId) return "bg-blue-50 border border-blue-200";
    return "bg-white border border-slate-200";
  };

  const badgeText = (f) => {
    if (isFinished(f)) return "Finished";
    if ((f?.fixture?.id ?? null) === nextUpcomingId) return "Next";
    return "Upcoming";
  };

  if (error) return <p className="mt-8 text-rose-600">{error}</p>;
  if (!teamFixtures.length) return <p className="mt-8 text-slate-600">No fixtures found for this team.</p>;

  const FixtureGrid = ({ data }) => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((f, i) => {
        const id = f?.fixture?.id ?? i;
        const home = f?.teams?.home?.name ?? "Home";
        const away = f?.teams?.away?.name ?? "Away";
        const dateStr = fmtDateTime(f?.fixture?.date);
        const finished = isFinished(f);
        const goalsHome = Number.isFinite(f?.goals?.home) ? f.goals.home : 0;
        const goalsAway = Number.isFinite(f?.goals?.away) ? f.goals.away : 0;
        const score = `${goalsHome} - ${goalsAway}`;

        return (
          <div key={id} className={`rounded-lg p-4 shadow-sm ${cardClass(f)}`}>
            <div className="flex items-start justify-between mb-1">
              <h4 className="h4 leading-snug">{home} vs {away}</h4>
              <span className="text-[10px] sm:text-xs px-2 py-1 rounded bg-black/5">
                {badgeText(f)}
              </span>
            </div>

            {finished ? (
              <>
                <div className="mt-1 text-sm sm:text-base font-semibold text-slate-900">Final: {score}</div>
                <div className="text-xs sm:text-sm text-slate-700">{dateStr}</div>
              </>
            ) : (
              <div className="mt-1 text-xs sm:text-sm text-slate-700">{dateStr}</div>
            )}

            <div className="mt-2 text-[11px] sm:text-xs text-slate-500">
              {f?.league?.name ?? "League"}{f?.league?.country ? ` · ${f.league.country}` : ""}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="mt-8">

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