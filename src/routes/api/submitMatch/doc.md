For those interested, here's an example query to this route:
```typescript
const match = {
    match_key: "2025demo_match2",
    team_number: 1101,
    event_key: "2025demo",
    auto_start_location: "Mid",
    auto_leave_start: false,
    timeline: {
        auto: [],
        tele: []
    },
    endgame: "Shallow",
    skill: 5,
    notes: "bad :(",
    incap_time: [],
    user_id: 0,
    tagNames: ["defender", "mech-fail"]
}

await fetch('/api/submitMatch', {
    method: 'POST',
    body: JSON.stringify(match),
    headers: {
        'Content-Type': 'application/json'
    }
})
```