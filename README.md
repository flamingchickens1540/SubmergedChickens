# SubmergedChickens

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
pg_setup # only first time
pg_start # if you didn't run above command
bun i
bun db:load
# once your done
pg_stop && exit
```
