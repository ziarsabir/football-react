# Football Stats App

A full-stack football platform built with React, Express, and SQL that displays Premier League fixtures, standings, team information, transfers, and curated football news.

The application follows a client-server architecture where the React frontend communicates with a custom Express REST API. Football data is stored in a SQL database and served through the backend, while football news is aggregated from multiple RSS feeds.

---

## Features

### Frontend (React)

- Live Premier League fixtures
- League standings
- Team information and statistics
- Squad information
- Team fixtures
- Transfer history
- Search and filtering
- Responsive UI built with Tailwind CSS
- Smooth in-page navigation

### Backend (Express.js)

- RESTful API
- Retrieves football data from a SQL database
- Aggregates football news from multiple RSS feeds
- Converts XML feeds into JSON
- Filters Premier League news articles
- Serves data to the frontend through custom API endpoints

### Database

- SQL database
- Stores football teams, standings, fixtures, transfers and related data
- Eliminates the need for the frontend to communicate directly with third-party football APIs

---

## Architecture

```text
React Frontend
        │
        ▼
Express REST API
        │
        ▼
    SQL Database
```

Football news follows a similar flow:

```text
RSS Feeds
(BBC, Sky Sports, ESPN)
        │
        ▼
Express Backend
(XML → JSON)
        │
        ▼
React Frontend
```

---

## Tech Stack

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

### Database

- SQLite

---

## Project Structure

### Frontend (`football-stats-app-client`)

```
src/
├── api/
├── components/
├── pages/
├── App.jsx
```

### Backend (`football-stats-backend`)

```
server.js
database.db
routes/
```

---

## Setup

### Clone the repository

```bash
git clone <repository-url>
```

### Frontend

```bash
cd football-stats-app-client
npm install
npm run dev
```

### Backend

```bash
cd football-stats-backend
npm install
node server.js
```

---

## Environment Variables

Create a `.env` file for the backend.

```env
PORT=3001
```

If you wish to refresh or repopulate the football database from API-Football, you'll also need:

```env
API_KEY=your_api_football_key
```

---

## API Endpoints

### Football

- `GET /api/standings`
- `GET /api/fixtures`
- `GET /api/teams`
- `GET /api/team/:id`
- `GET /api/team/:id/transfers`
- `GET /api/team/:id/fixtures`

### News

- `GET /api/news`

---

## Key Concepts Demonstrated

- Full-stack web development
- RESTful API design
- SQL database integration
- React component architecture
- Express backend development
- Server-side data processing
- XML to JSON transformation
- Responsive UI development
- Client-server architecture
- Deployment using Render

---

## Author

Ziar Sabir