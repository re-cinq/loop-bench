Committed and pushed `14d3952` using `direct`. Added one acceptance test, spec traceability, and `.lore/dod.md`. No production changes. Branch is current with `main` and its upstream.

Ran only the new acceptance file. Actual failure:

```text
- "calls": 1,
+ "calls": 0,
  "rejected": true,
  "unchanged": true,

Tests: 1 failed, 1 total
```

The test exercises real hook rejections through the shared catch, without provider doubles.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}