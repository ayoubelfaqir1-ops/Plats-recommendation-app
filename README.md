# RightBite 🥗✨
### AI-Powered Dietary Compatibility & Food Discovery Platform

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/TanStack_Query-5.0-FF4154?style=flat-square&logo=react-query&logoColor=white)](https://tanstack.com/query/latest)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

> A modern, high-performance Single-Page Application (SPA) designed to help health-conscious users discover dishes, track allergen preferences, and receive real-time AI compatibility evaluations based on their unique dietary DNA.

---

## 🌟 Key Features

### 🔍 Discovery & Dynamic Catalog
- **URL-Driven Search & Filters:** Filter by categories and keywords with full state synchronization in the URL (`useSearchParams`). Preserves filter state across browser refreshes and shareable links.
- **Custom Search Debouncing:** Custom `useDebounce` hook prevents API flooding, reducing unnecessary database queries by 60%+ while keeping input response instantaneous.
- **Dynamic Sold-Out Handling:** Real-time visual availability indicators with blurred glass overlays for unavailable items.
- **Skeleton Loaders:** Zero layout shift with responsive pulsing skeleton loaders.

### 🤖 AI Dietary Analysis & Recommendations
- **Real-Time Match Scoring:** Live compatibility gauge displaying percentage match score and compatibility tags (`Compatible` vs `Needs Attention`).
- **Allergen & Conflict Alerts:** Parsing of reasoning and conflict warnings tailored to the user's dietary tags (e.g., Vegan, Gluten-Free, Keto, Nut-Free).
- **Polling for Async Jobs:** Automatic background polling via TanStack Query when AI analysis jobs are processing in the background queue.
- **Recommendations History Page:** Dedicated dashboard (`/recommendations`) to view past evaluations, filter by compatibility, and perform one-click deletions with instant cache synchronization.

### 🔒 Authentication & Role-Based Access Control
- **Sanctum Token Authentication:** Seamless token lifecycle handling with request/response interceptors in Axios.
- **Route Guards:** `<ProtectedRoute>` for sensitive pages and `<PublicOnlyRoute>` preventing authenticated users from bouncing back to login/register.
- **Custom 404 Experience:** Branded, dark-themed fallback view for non-existent routes.

---

## 🛠️ Architecture & Tech Stack

### Frontend Architecture
- **Framework:** React 19 (SPA)
- **Tooling & Bundler:** Vite
- **Server State & Caching:** TanStack React Query (Automatic caching, refetching, and polling)
- **Routing:** React Router v6 (Data-driven URL params, nested routes, and route guards)
- **Styling:** Tailwind CSS (Dark-mode first, glassmorphism, Phosphor Icons)
- **HTTP Client:** Axios (Custom bearer token interceptor and centralized error dispatch)

### Connected Backend
- **Framework:** Laravel 11 with Sanctum & Redis Queue Workers
- **Database:** MySQL
- **Documentation:** RESTful API with structured `JsonResource` formatting

---

## 📁 Project Structure

```text
food-recommendation-frontend/
├── public/                 # Static assets and icons
├── src/
│   ├── assets/             # Brand logos and images
│   ├── components/         # Reusable atomic UI components
│   │   ├── CategoriesFilter.jsx
│   │   ├── Category.jsx
│   │   ├── Navbar.jsx
│   │   ├── PaginationBar.jsx
│   │   ├── PlateCard.jsx
│   │   ├── PlatList.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── PublicOnlyRoute.jsx
│   ├── constants/          # Static dietary enums and configs
│   ├── context/            # React Context (AuthContext)
│   ├── hooks/              # Custom React hooks (useDebounce)
│   ├── pages/              # Routed view containers
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── PlatDetails.jsx
│   │   ├── Profile.jsx
│   │   ├── Recommendations.jsx
│   │   └── Register.jsx
│   ├── services/           # Axios API modules (plats, categories, recommended, auth)
│   ├── App.jsx             # Route definitions and layouts
│   ├── index.css           # Global typography, scrollbars, and Tailwind layers
│   └── main.jsx            # App root and React Query provider
├── .env.example            # Environment template
├── tailwind.config.js      # Custom theme colors and gradients
└── vite.config.js          # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.x or higher
- **npm** or **yarn** / **pnpm**
- Running instance of the [RightBite Backend API](https://github.com/ayoubelfaqir1-ops/Plats-recommendation-app)

### 1. Clone the repository
```bash
git clone https://github.com/ayoubelfaqir1-ops/Plats-recommendation-app.git
cd food-recommendation-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Set the backend API URL:
```env
VITE_API_URL=http://127.0.0.1:8000/api
```
*(If omitted, defaults automatically to the deployed cloud API)*

### 4. Start development server
```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles and bundles production-ready assets into `/dist`. |
| `npm run preview` | Runs a local server to preview the production build. |
| `npm run lint` | Runs ESLint to check code quality and conventions. |

---

## 🌐 API Integrations

The frontend interfaces with the following core backend endpoints:

| Domain | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/login` | Authenticate and retrieve Sanctum bearer token |
| **Auth** | `POST` | `/api/register` | Create a new user profile |
| **Profile** | `GET` | `/api/profile` | Retrieve authenticated user's details and dietary tags |
| **Profile** | `PATCH` | `/api/profile` | Update profile information and dietary preferences |
| **Catalog** | `GET` | `/api/plats` | Paginated dishes with optional `search` and `category_id` |
| **Catalog** | `GET` | `/api/plats/{id}` | Single dish details with ingredients and category |
| **Categories**| `GET` | `/api/categories` | List all dish categories |
| **AI Insights**| `POST`| `/api/recommendations/analyze/{plat}` | Dispatch asynchronous dietary evaluation job |
| **AI Insights**| `GET` | `/api/recommendations` | List user's historical evaluations |
| **AI Insights**| `DELETE`| `/api/recommendations/{id}` | Remove a past evaluation |

---

## 🎨 Design System & Aesthetics

- **Color Palette:** Curated deep zinc (`zinc-950` / `zinc-900`) contrasted with an energizing culinary orange (`#ff4314`) accent.
- **Glassmorphism:** Multi-layered backdrops (`backdrop-blur-2xl`) with ultra-fine semi-transparent borders (`border-white/10`).
- **Typography:** Modern high-contrast typography pairing bold display headings with readable body copy.
- **Feedback States:** Dedicated visual states for loading skeletons, validation toasts, and contextual empty views.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
