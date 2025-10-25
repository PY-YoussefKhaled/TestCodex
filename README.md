# Note Application Monorepo

This repository hosts a full-stack note taking application built with the latest versions of Angular and ASP.NET Core.

## Structure

- `client/` – Angular 17 front end using standalone components and SCSS styling.
- `server/` – ASP.NET Core 8 Web API backed by Entity Framework Core with a SQLite database.

## Prerequisites

- Node.js 20+
- npm 10+
- .NET SDK 8.0+

## Getting Started

### Front end

```bash
cd client
npm install
npm start
```

During development the Angular dev server proxies API calls to the ASP.NET backend via `proxy.conf.json`.

### Back end

```bash
cd server
dotnet restore
dotnet run
```

The API automatically creates a local SQLite database file (`notes.db`) on first run and enables Swagger UI in development mode at `/swagger`.

## Environment Configuration

The Angular project reads its API base URL from the environment configuration files in `src/environments/`. Update these values when deploying to other environments.

The ASP.NET API uses the `Default` connection string defined in `appsettings.json`. Change it to point to your preferred database provider if you do not want to use SQLite.

## Scripts

- `npm run build` – builds the Angular application for production.
- `dotnet publish -c Release` – publishes the ASP.NET Core API.

## Next Steps

- Implement persistence migrations with `dotnet ef`.
- Add authentication and authorization.
- Write unit and integration tests for both the front end and the back end.

