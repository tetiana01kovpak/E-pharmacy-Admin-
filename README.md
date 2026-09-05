# E-Pharmacy Admin Panel

A full-stack admin panel for a medical store, built from the spec in `tasks/` and the Figma export in `design/`.

- `backend/` — Node.js + Express + MongoDB (Mongoose) API, JWT auth
- `frontend/` — React (Vite) admin panel: Redux Toolkit + RTK Query, React Router, react-hook-form + yup

## Prerequisites

- Node.js 18+
- A MongoDB connection string (e.g. a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

## 1. Backend setup

```bash
cd backend
npm install
```

Edit `backend/.env` and set `MONGO_URI` to your real connection string (copy from `.env.example` if you need a fresh starting point):

```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/e-pharmacy?retryWrites=true&w=majority
```

This project reads from a MongoDB database that already contains real imported data (`products`, `suppliers`, `orders`, `users`, `financeentries` — no separate `customers` collection; "customers" are derived from `users` + their `orders`). Run the migration script once to add the few admin-only fields that weren't part of the original import (`stock` on products, `status` on orders, normalized supplier statuses) and to create the demo admin account:

```bash
npm run seed
```

This is additive-only and never deletes or overwrites your imported data. It prints the admin login credentials to use on the Login page (`vendor@gmail.com` / the password shown in the console).

Start the API (default port `4000`):

```bash
npm run dev
```

`GET http://localhost:4000/health` should return `{"status":"ok"}` once it's running.

## 2. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Opens on `http://localhost:5173`. The dev server proxies `/api/*` requests to `http://localhost:4000`, so no extra config is needed as long as the backend is running.

Log in with the admin credentials printed by the seed script.

## Project structure

See `tasks/frontend.txt` / `tasks/backend.txt` for the original spec, and `design/` for the Figma export (colors, spacing, per-breakpoint screenshots) used as the visual reference.

## Notes on deviations from the raw spec

- The design mockups reference customer/user avatar photos that weren't included in the Figma export, so avatars are rendered as colored initials instead of images.
- The login button's target route (`/home` in the spec text) doesn't match any defined route, so it redirects to `/dashboard`, the actual private landing page.
- The Customers table's "Action" column has no corresponding edit endpoint in the backend spec, so it opens a read-only detail view (customer info + order history) instead of an edit form.
