# SubmergedChickens

2025 Reefscape FRC Scouting System

## Setup

Get an `API_KEY` for [the TBA API v3](https://www.thebluealliance.com/apidocs/v3)

Setup postgresql and update .env

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
exit
```
