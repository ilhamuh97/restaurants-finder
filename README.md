# Restaurant Finder

A full-stack web application with a React frontend, Spring Boot backend, and a PostgreSQL database.

---

## What is Docker Compose?

Docker Compose is a tool that lets you run multiple applications (called **services**) together with a single command. Instead of manually installing PostgreSQL and pgAdmin on your computer, Docker Compose downloads and starts them inside isolated containers automatically.

Think of a container as a lightweight, self-contained box that holds an application and everything it needs to run — so it works the same on every machine.

---

## Services in this project

This project's `docker-compose.yml` defines four services:

### 1. `postgres` — the database

| Setting | Value |
|---|---|
| Image | `postgres:18` |
| Container name | `restaurant-finder` |
| Port | `5432` (your computer) → `5432` (inside the container) |

This runs a PostgreSQL database server. The application stores all its data here (restaurants, users, etc.).

- **`image: postgres:18`** — uses the official PostgreSQL version 18 image from Docker Hub.
- **`ports: "5432:5432"`** — makes the database reachable from your computer at `localhost:5432`.
- **`volumes: postgres_data`** — saves the database data to your computer so it is not lost when you stop the container.
- **`restart: unless-stopped`** — automatically restarts the container if it crashes, unless you explicitly stop it.
- **`healthcheck`** — Compose waits until `postgres` is actually accepting connections (not just started) before starting `backend`.

### 2. `pgadmin` — the database GUI

| Setting | Value |
|---|---|
| Image | `dpage/pgadmin4:latest` |
| Container name | `my_pgadmin` |
| Port | `5050` (your computer) → `80` (inside the container) |

pgAdmin is a web-based tool that lets you visually browse and manage your PostgreSQL database — no SQL command line required.

- **`depends_on: postgres`** — Docker Compose always starts the `postgres` service before starting `pgadmin`.
- Open your browser at **http://localhost:5050** to access the pgAdmin interface.

### 3. `backend` — the Spring Boot API

| Setting | Value |
|---|---|
| Build context | `./backend` (built from `backend/Dockerfile`) |
| Container name | `rf-be-ilham` |
| Port | `8080` (your computer) → `8080` (inside the container) |

This builds and runs the Spring Boot API that serves `/api/...` endpoints and talks to PostgreSQL.

- **`environment`** — `POSTGRES_URL` points at `postgres:5432` (the service name), not `localhost`, since inside Docker's network each service is reached by its service name.
- **`depends_on: postgres (service_healthy)`** — waits for the database to be ready before starting, avoiding startup connection failures.

### 4. `frontend` — the React app served by nginx

| Setting | Value |
|---|---|
| Build context | `./frontend` (built from `frontend/Dockerfile`) |
| Container name | `rf-fe-ilham` |
| Port | `3000` (your computer) → `80` (inside the container) |

This builds the React app and serves it with nginx, which also reverse-proxies `/api/...` requests to the `backend` container.

- `frontend/nginx.conf` proxies `/api/` to `http://rf-be-ilham:8080` — this only resolves because both containers are on the same Compose-managed network.
- **`depends_on: backend`** — starts after the backend so the API is available when the app loads.
- Open your browser at **http://localhost:3000** to use the app.

> **Note:** Both `backend` and `frontend` are built from your local source (`build: ./backend` / `build: ./frontend`), not pulled from Docker Hub. This matches what CI/CD publishes, but any local code changes require a rebuild — see below.

---

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

---

## Setup

1. Copy the example environment file and fill in your own values:

   ```bash
   cp .env.example .env
   ```

   Open `.env` and set the variables:

   ```env
   POSTGRES_DB=your_database_name
   POSTGRES_USER=your_username
   POSTGRES_PASSWORD=your_password
   POSTGRES_URL=jdbc:postgresql://localhost:5432/your_database_name
   PGADMIN_DEFAULT_EMAIL=your@email.com
   PGADMIN_DEFAULT_PASSWORD=your_pgadmin_password
   GEOAPIFY_API_KEY=your_geoapify_api_key
   ```

   > These values are kept out of the code for security. Never commit your `.env` file.
   > `POSTGRES_URL` here is only used if you run the backend outside Docker (e.g. from your IDE). Inside Compose, `backend` connects to `postgres:5432` automatically — you don't need to change this value for `docker compose up` to work.

2. Start all services (database, pgAdmin, backend API, and frontend):

   ```bash
   docker compose up -d --build
   ```

   The `-d` flag runs the containers in the background (detached mode). `--build` builds the `backend`/`frontend` images from source — required the first time and after any code changes.

3. Verify that all containers are running:

   ```bash
   docker compose ps
   ```

---

## Accessing the services

| Service | URL | Credentials |
|---|---|---|
| Frontend (app) | http://localhost:3000 | — |
| Backend (API) | http://localhost:8080/api | — |
| PostgreSQL | `localhost:5432` | values from your `.env` |
| pgAdmin | http://localhost:5050 | `PGADMIN_DEFAULT_EMAIL` / `PGADMIN_DEFAULT_PASSWORD` |

### Connecting pgAdmin to the database

1. Open http://localhost:5050 and log in with your pgAdmin credentials.
2. Click **Add New Server**.
3. Under the **General** tab, give it any name (e.g. `Restaurant Finder`).
4. Under the **Connection** tab, fill in:
    - **Host**: `postgres` (the service name — Docker's internal network resolves this automatically)
    - **Port**: `5432`
    - **Username** and **Password**: values from your `.env`
5. Click **Save**.

---

## Rebuilding after code changes

`backend` and `frontend` are built from your local source, so Compose won't pick up code changes automatically. After editing backend or frontend code:

```bash
docker compose up -d --build
```

This rebuilds only the images whose source changed and recreates those containers.

---

## Stopping the services

```bash
docker compose down
```

This stops and removes the containers. Your data is safe — it is stored in the `postgres_data` volume and will be there the next time you run `docker compose up`.

To also delete all stored data (a full reset):

```bash
docker compose down -v
```