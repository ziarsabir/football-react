FOOTBALL STATS APP

A full-stack football platform that displays Premier League data including fixtures, standings, team stats, and curated football news.

OVERVIEW

This project combines a React frontend with a Node.js backend to deliver real-time football data and filtered news in one place.

The frontend consumes the API-Football service to display live football data such as fixtures, standings and team information.

The backend aggregates football news from multiple sources, converts XML data into JSON format, and filters content to focus specifically on Premier League-related articles.

FEATURES

Frontend (React):

Displays live fixtures
Shows league standings
Provides detailed team information and statistics
Displays team fixtures and transfers
Clean and responsive UI built with Tailwind CSS
Modular component-based architecture

Backend (Node.js):

Fetches RSS feeds from BBC Sport, Sky Sports and ESPN
Converts XML data into JSON for easier use in JavaScript
Filters news articles to show only relevant Premier League content
Provides a custom API endpoint for the frontend to consume

TECH STACK

Frontend:

React (built with Vite)
JavaScript (ES6+)
Tailwind CSS

Backend:

Node.js
Express
node-fetch
xml2js
CORS

External API:

www.api-football.com (used for fixtures, standings and team data)

PROJECT STRUCTURE

The project is split into two main parts:

Frontend (football-stats-app-client):

src/api contains the API logic (footballApi.js)
src/components contains reusable UI components such as Navbar, Fixtures, StandingsTable, TeamDetails, etc.
src/pages contains page-level components such as Home, Fixtures, Standings and Teams
App.jsx acts as the main root component

Backend (football-stats-backend):

server.js contains the Express server and API logic
Handles RSS feed fetching, XML parsing and filtering

SETUP INSTRUCTIONS

Clone the repository and navigate into the project folder.
Frontend setup:
Go into the football-stats-app-client folder
Run npm install
Run npm run dev to start the development server
Backend setup:
Go into the football-stats-backend folder
Run npm install
Run node server.js to start the backend server

ENVIRONMENT VARIABLES

Created a .env file in the frontend project and added my API-Football key:

API_KEY=my_api_football_key

API ENDPOINTS

Backend endpoint:
GET /api/news

This endpoint returns filtered football news articles aggregated from multiple sources.

FUTURE IMPROVEMENTS

Integrate an SQL database for persistent data storage
Add user authentication and saved favourites
Deploy the full-stack application (e.g. using Render or Vercel)
Implement caching for API responses to improve performance
Improve news filtering logic for better relevance

LEARNING GOALS

This project was built to:

Practice full-stack development
Work with third-party APIs
Understand backend data processing (XML to JSON)
Prepare for SQL integration and cloud-based deployment

AUTHOR

Ziar Sabir