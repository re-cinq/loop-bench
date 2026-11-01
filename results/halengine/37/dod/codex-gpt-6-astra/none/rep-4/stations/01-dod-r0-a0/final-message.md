Committed and pushed `5326112` with three red acceptance tests, spec links, and `.lore/dod.md`. Strategy: `direct`. Branch is current with `origin/main`; working tree is clean.

Actual failures:

```text
- "invalidCalls": 0,
+ "invalidCalls": 4,
- "compiledAtRegistration": true,
+ "compiledAtRegistration": false,
- "rejection": true,
+ "rejection": false,

Tests: 3 failed, 3 total
```

The handoff records the retry-loop coverage limitation: the ticket requests a stub provider, but this task prohibits stubs. No production code changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}