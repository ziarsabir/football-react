const API_KEY = '31cac3d5105c65b67d9a3a31bd4e8b57';
const BASE_URL = "https://v3.football.api-sports.io";

// These are like addresses on an envelope 
const headers = {
"X-RapidAPI-Key": API_KEY,
"X-RapidAPI-Host": "v3.football.api-sports.io"
};

// Fetch is returning as a response a promise. 
// .then is way of dealing with the response but await is a much cleaner way of doing so. 
// Async type function is the only way to use the await key word - if you are RESOLVING a response with .then don't need 'async' keyword. 
export const fetchStandings = async (leagueId = 39, season = 2025) => {
const res = await fetch(`${BASE_URL}/standings?league=${leagueId}&season=${season}`, { headers });
return res.json();
};

export const fetchLiveFixtures = async () => {
const res = await fetch(`${BASE_URL}/fixtures?live=all`, { headers });
return res.json();
};

export const fetchPremierLeagueLiveFixtures = async ( season = 2025, leagueId=39)=>{
  
const res = await fetch(`${BASE_URL}/fixtures?live=all&league=${leagueId}&season=${season} `, { headers });
return res.json();
}
export const fetchTeamDetails = async (teamId = 34) => {
const res = await fetch(`${BASE_URL}/teams?id=${teamId}`, { headers });
return res.json();
};

//get all the premier Leaugue teams

export const fetchPremierLeagueTeams = async (season = 2025,leagueId = 39, ) => {
    const res = await fetch(`${BASE_URL}/teams?league=${leagueId}&season=${season}`, { headers });
    return res.json();
    };



export const fetchTeamStats = async (teamId = 34, leagueId = 39, season = 2025) => {
    const res = await fetch(`${BASE_URL}/teams/statistics?team=${teamId}&league=${leagueId}&season=${season}`, { headers });
    return res.json();
    };

// New function to fetch player transfers
export const fetchPlayerTransfers = async (playerId = 35845) => {
    const res = await fetch(`${BASE_URL}/transfers?player=${playerId}`, {headers});
    return res.json();
};

export const fetchTeamsByLeague = async (leagueId = 39, season = 2025) => {
    const res = await fetch(`${BASE_URL}/teams?league=${leagueId}&season=${season}`, { headers });
    return res.json();
  }; 

  // Get all transfers from one {team}
export const fetchTransfersByTeam = async (teamId = 34) => {
    const res = await fetch(`${BASE_URL}/transfers?team=${teamId}`, { headers }); 
    return res.json(); 
}


export const fetchFixturesByLeague = async (leagueId = 39, season = 2025) => {
    const res = await fetch(`${BASE_URL}/fixtures?league=${leagueId}&season=${season}`, { headers });
    return res.json(); 
  }; 

export const fetchFixturesByTeam = async (teamId = 40, season = 2025) => {
    const res = await fetch(`${BASE_URL}/fixtures?team=${teamId}&season=${season}`, { headers });
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
