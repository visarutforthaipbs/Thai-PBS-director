# Thai PBS Director

An application for collecting and visualizing public opinion on Thai PBS director candidates.

## Project Structure

This project consists of:

- **Frontend**: React + TypeScript + Chakra UI (`client/` directory)
- **Backend**: Express + MongoDB (`server/` directory)

## Setup Instructions

### Prerequisites

- Node.js 16+
- MongoDB

### Backend Setup

1. Navigate to the server directory:

```
cd server
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/thai-pbs-director
CORS_ORIGIN=http://localhost:3000
```

4. Start the development server:

```
npm run dev
```

### Frontend Setup

1. Navigate to the client directory:

```
cd client
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file with:

```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:

```
npm start
```

## Deployment

### Frontend (Vercel)

The frontend is configured for deployment to Vercel with `vercel.json`.

1. Install Vercel CLI:

```
npm install -g vercel
```

2. Deploy:

```
cd client
vercel
```

### Backend (Render)

The backend is configured for deployment to Render with `render.yaml`.

1. Create a new web service on Render.
2. Connect your GitHub repository.
3. Configure environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `CORS_ORIGIN`: Your frontend URL
   - `NODE_ENV`: production
   - `PORT`: 8080 (Render will automatically set `PORT` to its own value)

## Features

- Candidate listings with detailed profiles
- Opinion submission form
- Data visualization dashboard with bar charts and word cloud
- Thai language interface with Sarabun font
- Responsive design for mobile and desktop
