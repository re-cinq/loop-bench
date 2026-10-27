Added and pushed a direct acceptance test for required `location` validation. It fails because malformed input reaches the executor:

```text
Expected pattern: /location|required/i
Received string:  "forecast"
```

The executor was also invoked, contrary to the ticket’s claim. The test and `.lore/dod.md` are committed in `29e1b92`; `origin/main` was already merged, and the branch is synchronized with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}