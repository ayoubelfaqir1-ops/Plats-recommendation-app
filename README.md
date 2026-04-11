# RightBite Frontend

Frontend application for RightBite, a food recommendation platform focused on dietary preferences, dish discovery, and AI-assisted plat analysis.

## Overview

This repository contains the client-side application built with React and Vite.

Users can:

- register and log in
- browse plats and categories
- search dishes
- open a detailed plat page
- view AI recommendation results
- update profile information
- manage dietary tags

The backend API is maintained in a separate Laravel repository.

## Tech Stack

- React 19
- Vite
- React Router
- React Query
- Tailwind CSS
- Axios

## Features

- Token-based authentication flow
- Protected routes
- Dynamic home page with search and pagination
- Plat details page with dietary analysis states
- Profile page with editable dietary tags
- Shared navbar with profile and logout menu
- SPA routing with refresh support

## Project Structure

```text
src/
├── components/
├── constants/
├── context/
├── pages/
├── services/
├── App.jsx
├── index.css
└── main.jsx
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Run lint

```bash
npm run lint
```

### 4. Build for production

```bash
npm run build
```

## Development Server

Default Vite URL:

```text
http://localhost:5173
```

## API Integration

The frontend expects a Laravel API running separately.

Current API base URL used by the app:

```text
http://127.0.0.1:8000/api
```

This is configured in:

- [src/services/api.js](./src/services/api.js)

If the API URL changes after deployment, update the base URL in that file or move it to environment variables.

## Authentication Flow

- login stores the user token in `localStorage`
- app reloads the current user from `/profile`
- protected pages redirect unauthenticated users to `/login`
- logout clears the token and user state

## Main Pages

### Home

- search plats
- browse categories
- paginate through dishes

### Plat Details

- view image, price, description, and ingredients
- run recommendation analysis
- see recommendation states: pending, ready, failed

### Profile

- update name and email
- edit dietary tags
- keep navbar user info in sync after save

## UI Direction

The interface uses:

- dark zinc backgrounds
- glass panels
- bold typography
- orange primary accent
- rounded modern cards and controls

The goal is to keep the application visually consistent across home, details, login, register, and profile pages.

## Deployment Note

This repository contains only the frontend.

The backend API is in a separate repository and can be deployed independently. Once the backend is deployed, update the frontend API URL if needed.

## Notes

- Browser refresh support for routed pages is enabled for Apache with `.htaccess`
- recommendation behavior depends on backend processing and API availability
- profile dietary tags are aligned with backend enum values

## Author

Built as a learning-focused full-stack food recommendation project with emphasis on clean UI, API integration, and dietary preference management.

