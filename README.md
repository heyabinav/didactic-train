# HonkeyType

HonkeyType is a premium, Monkeytype-inspired full-stack typing speed platform with a React frontend and Node.js/Express backend.

## Project Structure

```
.
├── frontend/                # React + Vite client
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # App-wide context (theme/auth/test)
│   │   ├── pages/           # Route-level pages
│   │   ├── services/        # API layer
│   │   ├── data/            # Client defaults and constants
│   │   └── styles/          # Global and component styles
├── backend/                 # Express + MongoDB API
│   ├── data/paragraphs.json # 120 paragraphs (easy/medium/hard)
│   └── src/
│       ├── config/          # DB and env setup
│       ├── controllers/     # Route handlers
│       ├── models/          # Mongoose schemas
│       ├── routes/          # API routes
│       ├── services/        # Business logic
│       └── utils/           # Helpers and seeders
```

## Features

- 100+ difficulty-tagged paragraphs
- Live WPM, CPM, accuracy, timer, and mistake highlighting
- Dark/light mode with glassmorphism-neumorphism style
- Multi-page experience: Home, Test, Results, Leaderboard, Login/Signup, Dashboard
- Persisted users, typing results, and leaderboard APIs
- AI paragraph generation endpoint (OpenAI-ready fallback)
- Chart-based analytics (Chart.js)

## Local Run Instructions

### 1) Backend

```bash
cd backend
npm install
npm run seed
npm run dev
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/honkeytype
JWT_SECRET=super-secret
OPENAI_API_KEY=
```

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend expects backend at `http://localhost:5000/api`.

## API Endpoints

- `POST /api/start-test`
- `POST /api/submit-result`
- `GET /api/leaderboard?range=daily|weekly|all-time`
- `GET /api/user-history/:userId`
- `POST /api/auth/signup`
- `POST /api/auth/login`

## Notes

- Multiplayer race and keyboard heatmap are scaffold-ready optional advanced paths.
- Sound effects and custom themes are integrated as toggles/options in the UI.
