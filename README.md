# Event Management Frontend (React + Vite)

This is a single-page frontend application for an Event Management system built to satisfy an SDP project rubric. The app demonstrates component design, custom hooks, Context-based state management, routing, API integration, local persistence, and a responsive UI with Material UI.

Quick start

1. Install dependencies (PowerShell):

```powershell
cd "c:/Users/Admin/OneDrive/Desktop/Event_Management_system"
npm install
npm run dev
```

2. Open the dev server (usually at `http://localhost:5173`).

Features implemented

- Reusable React components (`Navbar`, `EventCard`, `EventList`, `EventForm`).
- React Hooks: `useState`, `useEffect`, `useContext`, and custom hooks (`useFetch`, `useLocalStorage`).
- Global state using Context API and `useReducer` with Local Storage persistence.
- Client-side routing via `react-router-dom`.
- External API integration: fetches sample events from `jsonplaceholder.typicode.com` using Axios.
- Data persistence in Local Storage for created and saved events.
- UI built with Material UI for responsive and accessible components.

Deployment

- This project builds into static files via `npm run build` and can be deployed to Netlify, Vercel, or GitHub Pages. For Netlify/Vercel, connect the repository and use the `vite build` output.

Netlify quick deploy

- Add this repo to Netlify or drag the folder into Netlify deploy; build command: `npm run build`, publish directory: `dist`.

Admin credentials (demo)

- Admin password: `admin123` (demo only). Use the Admin page and enter password to manage events.

Notes

- The external API provides placeholder data and is used here to demonstrate asynchronous fetch and loading/error states. Created events are saved locally.
