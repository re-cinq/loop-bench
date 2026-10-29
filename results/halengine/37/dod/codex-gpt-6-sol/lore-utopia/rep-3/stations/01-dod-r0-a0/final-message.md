Committed and pushed the `direct` Definition of Done in commit `3f2d03f`. The branch is current with `origin/main` and its upstream.

I ran only the two new acceptance files. **All five tests failed for the ticket’s stated reason.** The failure output includes:

> Expected pattern: /location.*required|required.*location/i  
> Received string: "forecast"

The registration test also reports `Received function did not throw`. These red tests now define the behavior needed to finish #37.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}