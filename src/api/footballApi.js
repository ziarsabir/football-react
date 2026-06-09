// Fetch is returning as a response a promise. 
// .then is way of dealing with the response but await is a much cleaner way of doing so. 
// Async type function is the only way to use the await key word - if you are RESOLVING a response with .then don't need 'async' keyword. 
export const fetchStandings = async (leagueId = 39, season = 2025) => {
  const res = await fetch(
  `http://localhost:4000/api/standings-db?league=${leagueId}&season=${season}`
);
  return res.json();
};

export const fetchPremierLeagueLiveFixtures = async (season = 2025, leagueId = 39) => {
  const res = await fetch(
    `http://localhost:4000/api/live-fixtures?league=${leagueId}&season=${season}`
  );

  return res.json();
};

export const fetchTeamDetails = async (teamId = 34) => {
  const res = await fetch(`http://localhost:4000/api/teams-db/${teamId}`);
  return res.json();
};

export const fetchSquadByTeam = async (teamId) => {
  const res = await fetch(`http://localhost:4000/api/squad-db/${teamId}`);
  return res.json();
};

export const fetchTeamsByLeague = async (leagueId = 39, season = 2025) => {
  const res = await fetch(
    `http://localhost:4000/api/teams-db?league=${leagueId}&season=${season}`
  );
  return res.json();
};

  // Get all transfers from one {team}
export const fetchTransfersByTeam = async (teamId) => {
  const res = await fetch(
    `http://localhost:4000/api/team-transfers-db/${teamId}`
  );
  return res.json();
};


export const fetchFixturesByTeam = async (teamId, season = 2025) => {
  const res = await fetch(
    `http://localhost:4000/api/team-fixtures-db/${teamId}?season=${season}`
  );
  return res.json();
};

export const fetchTeamLeaders = async (teamId) => {
  const res = await fetch(
    `http://localhost:4000/api/player-stats/${teamId}`
  );

  return res.json();
};

export const fetchGoalEventsByFixture = async (fixtureId) => {
  const res = await fetch(
    `http://localhost:4000/api/fixture-events-db/${fixtureId}`
  );

  return res.json();
};



// get("https://v3.football.api-sports.io/fixtures?team=85&season=2019&from=2019-07-01&to=2020-10-31");

// fetch("https://v3.football.api-sports.io/players/topredcards?season=2020&league=61", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "v3.football.api-sports.io",
// 		"x-rapidapi-key": "XxXxXxXxXxXxXxXxXxXxXxXx"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.log(err);
// });
