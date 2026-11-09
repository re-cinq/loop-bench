Committed and pushed `3c95bb9`: three acceptance tests, linked spec, and `.lore/dod.md`. Strategy: `direct`. Branch is current with `main` and fully pushed.

Actual failures:
```text
- "rejectedCalls": 0,
+ "rejectedCalls": 3,
- "compiledAtRegistration": true,
+ "compiledAtRegistration": false,
- "rejectionNamesPathAndType": true,
+ "rejectionNamesPathAndType": false,

Tests:       3 failed, 3 total
```

The DoD records the remaining tool-loop coverage conflict: the ticket requests a stub provider, while this task prohibits stubs.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}