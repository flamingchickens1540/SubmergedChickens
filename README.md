# ReefscapenChickens

2025 Reefscape FRC Scouting System

## Setup

First setup postgresql and update .env

```bash
bun i
bun db:load
```

### With Nix

```bash
nix develop
start-database
bun i
bun db:load
echo DATABASE_URL="postgresql://$(whoami):<passwd>@localhost:5432/database?schema=public" >> .env
# once your done
stop-database && exit
```
