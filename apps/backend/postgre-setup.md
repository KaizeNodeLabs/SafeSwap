# PostgreSQL Database Setup

This document explains how to set up and run the PostgreSQL database using Docker for development and testing purposes.

## Prerequisites

- Docker
- Docker Compose

## Configuration

The database configuration is managed through environment variables. Create a `.env` file in the `apps/backend` root with the following configuration:

```
POSTGRES_DB=testdb
POSTGRES_USER=testuser
POSTGRES_PASSWORD=test@Pwd
POSTGRES_PORT=5433
```

### Environment Variables

| Variable          | Description       | Current Value |
| ----------------- | ----------------- | ------------- |
| POSTGRES_DB       | Database name     | testdb        |
| POSTGRES_USER     | Database user     | testuser      |
| POSTGRES_PASSWORD | Database password | test@16790    |
| POSTGRES_PORT     | Database port     | 5433          |

## Getting Started

1. Start the database:

   ```bash
   docker compose up -d
   ```

2. Verify the database is running:

   ```bash
   docker compose ps
   ```

3. Connect to the database from inside the container:

   ```bash
   docker exec -it project_db psql -U testuser -d testdb
   ```

4. Connect to the database from your host machine:
   ```bash
   psql -h localhost -p 5433 -U testuser -d testdb
   ```

## Data Persistence

The database data is persisted through a Docker volume named `postgres_data`. This ensures your data survives container restarts and removals.

## Stopping the Database

To stop the database:

```bash
docker compose down
```

To stop the database and remove all data:

```bash
docker compose down -v
```

## Troubleshooting

If you encounter connection issues:

1. Check if the container is running:

   ```bash
   docker compose ps
   ```

2. View container logs:

   ```bash
   docker compose logs postgres
   ```

3. Ensure the port is not already in use:

   ```bash
   sudo lsof -i :5433
   ```

4. Test database connection:

   ```sql
   -- Once connected to psql, try:
   CREATE TABLE test (id serial PRIMARY KEY, name VARCHAR(50));
   INSERT INTO test (name) VALUES ('test item');
   SELECT * FROM test;
   ```

5. If you need to reset and start fresh:
   ```bash
   docker compose down -v
   docker compose up -d
   ```
