# Football Stats App

A full-stack football platform that displays Premier League data including fixtures, standings, team stats, and curated football news.

## Overview

This project combines a React frontend with a Node.js backend to deliver real-time football data and filtered news in one place:

- Frontend consumes the API-Football service (fixtures, standings, team information).
- Backend aggregates football news from multiple sources, converts XML data to JSON, and filters Premier League-related articles.

## Features

### Frontend (React)

- Live fixtures
- League standings
- Team information and statistics
- Team fixtures and transfers
- Clean, responsive UI with Tailwind CSS
- Modular component-based architecture

### Backend (Node.js)

- Fetches RSS feeds from BBC Sport, Sky Sports, and ESPN
- Converts XML to JSON
- Filters Premier League news
- Exposes a custom `/api/news` endpoint for frontend consumption

## Tech stack

### Frontend

- React (Vite)
- JavaScript (ES6+)
- Tailwind CSS

### Backend

- Node.js
- Express
- node-fetch
- xml2js
- CORS

### External services

- API-Football (`www.api-football.com`)

## Project structure

### Frontend (`football-stats-app-client`)

- `src/api` - API logic (`footballApi.js`)
- `src/components` - reusable UI widgets (`Navbar`, `Fixtures`, `StandingsTable`, `TeamDetails`, etc.)
- `src/pages` - page-level components (`Home`, `Fixtures`, `Standings`, `Teams`)
- `App.jsx` - root component

### Backend (`football-stats-backend`)

- `server.js` - Express server, RSS fetching, XML parsing, filtering

## Setup instructions

1. Clone repository.
2. Frontend:
   - `cd football-stats-app-client`
   - `npm install`
   - `npm run dev`
3. Backend:
   - `cd football-stats-backend`
   - `npm install`
   - `node server.js`

## Environment variables

This project uses API-Football for live and historical football data. The frontend needs a valid API key to retrieve fixtures, standings, teams, and other football data. Without the key, data requests fail and the UI cannot show any matches or stats.

How to get your API key:

1. Go to https://www.api-football.com
2. Sign up for a free account
3. Subscribe to the free plan (or any paid plan for higher limits)
4. Copy your API key from the dashboard

Create `.env` in frontend:

```env
API_KEY=my_api_football_key
```

## API endpoints

- `GET /api/news` - returns filtered football news articles aggregated from multiple sources

## Future improvements

- Add SQL database for persistent storage
- Add user authentication and saved favourites
- Deploy full-stack app (Render/Vercel)
- Add caching for API responses
- Improve news filtering relevance

## Learning goals

- Full-stack development practice
- Third-party API integration
- Backend data processing (XML → JSON)
- Prepare for SQL integration and cloud deployment

## Author

- Ziar Sabir
