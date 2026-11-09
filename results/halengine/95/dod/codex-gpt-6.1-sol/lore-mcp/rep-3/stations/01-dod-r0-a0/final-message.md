Committed and pushed `ca97ae2` using `direct`. Added one acceptance test, the spec guarantee, and `.lore/dod.md`. No production code changed.

Ran only the acceptance file. Actual failure:

```text
- "hookCalls": 1,
+ "hookCalls": 0,
- "hookError": true,
+ "hookError": false,

Tests: 1 failed, 1 total
```

All three non-Error cases fail as reported. Tests exercise the shared catch through real lifecycle hooks without doubles.

Base is merged; branch is fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}