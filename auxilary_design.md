# data model

- Preload every teammatch team-event, essentially all the quant data we want to collect.
- Then, we can have lists of what data exists, what doesn't, what we missed, etc.
- You'll just need to filter out TeamMatches that has nulls for certain fields.

# prep builder

- Prep Builder is for calculations, tableau is for visualization
- This year we _should_ use prep builder for all calculations

# event state

- match list
- livestream url, statbotics, ec

# superscouting

- There are several benefits to having superscouting integrated with the scouting system
    - Integrated with tableau and all the rest of our data
- There are practically no downsides because we can fallback on spreadsheets

# defense

- Look at every instance of defense
    - Use mutally defended robots as a proxy for direct comparisons
- Looking at how effected both defended robots and defensive robots were when defending / being defended
    - We should ask skyehawk
- defender; defended; effectiveness (0, 1, 2)
- how to track this how to figure out defended?
    - maybe list them form offenseive?
    - dual value decomp?
- pairwise only works when there is 0 or 1 comparisons between teams.
    - If there is more then one with the current system the previous comparison is thrown out in favor of the "lastest"

# pairwise

- Defense comparisons don't work out
    - You would need a scout to always scout defense robots for this to work, so it's the job of a qual scout
    - Watch out for null comparisons
    - It's not a magic bullet
- Last year we were often vibes-based because we didn't have data
    - Pairwise is a good way of getting away from that
- "Value contributed to an alliance" as a metric

    - Comparing defensive robots with offensive robots might not be feasible for quant scouts

# pit display

- Blaze could work on this
- Considerably more complex than hensight

# pit scouting

- Maybe weight
- We're leaning towards just photos
- Toggle what robots can and can't do throughout the event (TeamEvent data)
