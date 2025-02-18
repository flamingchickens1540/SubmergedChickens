For those interested, here's an example query to this route:

```typescript
const comp = {
    team_A_team_num: 1100,
    team_A_match_key: "2025demo_match1",
    team_B_team_num: 1101,
    team_B_match_key: "2025demo_match2",
    diff: 5,
    category: "good :)",
    event_key: "2025demo",
}

await fetch("/api/submitPairwise", {
    method: "POST",
    body: JSON.stringify(comp),
    headers: {
        "Content-Type": "application/json",
    },
})
```
