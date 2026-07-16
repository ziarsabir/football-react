// Fetch is returning as a response a promise. 
// .then is way of dealing with the response but await is a much cleaner way of doing so. 
// Async type function is the only way to use the await key word - if you are RESOLVING a response with .then don't need 'async' keyword. 
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

// Get standings
export const fetchStandings = async (leagueId = 39, season = 2025) => {
  const res = await fetch(
    `${API_BASE_URL}/api/standings-db?league=${leagueId}&season=${season}`
  );

  return res.json();
};

// Get live Premier League fixtures
export const fetchPremierLeagueLiveFixtures = async (
  season = 2025,
  leagueId = 39
) => {
  const res = await fetch(
    `${API_BASE_URL}/api/live-fixtures?league=${leagueId}&season=${season}`
  );

  return res.json();
};

// Get one team's details
export const fetchTeamDetails = async (teamId = 34) => {
  const res = await fetch(
    `${API_BASE_URL}/api/teams-db/${teamId}`
  );

  return res.json();
};

// Get one team's squad
export const fetchSquadByTeam = async (teamId) => {
  const res = await fetch(
    `${API_BASE_URL}/api/squad-db/${teamId}`
  );

  return res.json();
};

// Get all teams in a league
export const fetchTeamsByLeague = async (
  leagueId = 39,
  season = 2025
) => {
  const res = await fetch(
    `${API_BASE_URL}/api/teams-db?league=${leagueId}&season=${season}`
  );

  return res.json();
};

// Get transfers for one team
export const fetchTransfersByTeam = async (teamId) => {
  const res = await fetch(
    `${API_BASE_URL}/api/team-transfers-db/${teamId}`
  );

  return res.json();
};

// Get fixtures for one team
export const fetchFixturesByTeam = async (
  teamId,
  season = 2025
) => {
  const res = await fetch(
    `${API_BASE_URL}/api/team-fixtures-db/${teamId}?season=${season}`
  );

  return res.json();
};

// Get team leaders
export const fetchTeamLeaders = async (teamId) => {
  const res = await fetch(
    `${API_BASE_URL}/api/player-stats/${teamId}`
  );

  return res.json();
};

// Get goal events for one fixture
export const fetchGoalEventsByFixture = async (fixtureId) => {
  const res = await fetch(
    `${API_BASE_URL}/api/fixture-events-db/${fixtureId}`
  );

  return res.json();
};