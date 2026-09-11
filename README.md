# CivicDesk — Frontend

React + TypeScript + Tailwind v4 client for the CivicDesk API.

## Setup
```
npm install
cp .env.example .env.local   # set VITE_API_URL to your backend
npm run dev
```

## Structure
```
src/
  context/     AuthContext (JWT + refresh), ToastContext
  components/  Navbar, ProtectedRoute, DashboardShell, StatusStamp
  lib/         api client (axios), shared types
  pages/
    Landing, Login, Register
    citizen/   overview, file complaint, complaint detail, services, service request detail
    staff/     department complaint queue, service request processing
    admin/     stats, users, departments, service types
```

## Design
"Public Ledger" concept — municipal teal + signal-amber accent on a
blueprint-paper background, ruled dividers instead of card shadows,
monospace reserved for real ticket/case numbers. Fraunces for headlines,
Inter for body.

## Deploying to Vercel
Set `VITE_API_URL` as an environment variable in Vercel pointing at your
live backend's `/api/v1` path. `vercel.json` already handles the SPA
rewrite so client-side routes don't 404 on refresh.
"# civicdesk-frontend" 
