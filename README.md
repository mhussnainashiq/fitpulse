# FitPulse — Track Your Fitness

A professional full-stack fitness tracking application built with React, Vite, Node.js, Express, MongoDB, JWT and Recharts.

## Features

- JWT authentication with bcrypt
- Fitness dashboard
- Workout CRUD
- Goals CRUD
- Nutrition CRUD
- Progress tracking
- Responsive sidebar/navbar
- Recharts analytics
- Protected routes
- Loading, error and empty states
- MongoDB/Mongoose backend
- Demo-friendly dashboard

## Stack

Frontend: React, Vite, React Router, Axios, Lucide React, Recharts, CSS

Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs

## Project Structure

```text
fitpulse/
├── client/
└── server/
```

## Setup

### 1. Backend

```powershell
cd server
npm install
copy .env.example .env
npm run dev
```

Set `MONGO_URI` and `JWT_SECRET` in `.env`.

### 2. Frontend

Open another PowerShell terminal:

```powershell
cd client
npm install
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:5000

## Demo

Register a new account. The dashboard automatically works with your account and can be populated using the forms.

## GitHub

Do not commit `server/.env`.
