import React, { useEffect, useState } from "react";
import { fetchFixturesByLeague } from "../api/footballApi";

const LeagueFixtures = () => {
    const [leagueFixtures, setLeagueFixtures] = useState([]);

    useEffect(() => {
    fetchFixturesByLeague().then(data => setLeagueFixtures(data.response || []));
    }, []); 
    
   

    if (leagueFixtures.length === 0) return <p>No live fixtures right now.</p>;

    return (
    <div>
    {leagueFixtures.map((f, i) => (
    <div key={i} className="fixture-card">
    <h3>{f.teams.home.name} vs {f.teams.away.name}</h3>
    <p><strong>Score:</strong> {f.goals.home} - {f.goals.away}</p>
    <p><strong>Status:</strong> {f.fixture.status.long} ({f.fixture.status.elapsed}' mins)</p>
    <p><strong>League:</strong> {f.league.name} ({f.league.country})</p>
    </div>
    ))}
    </div>
    );
};

export default LeagueFixtures; 