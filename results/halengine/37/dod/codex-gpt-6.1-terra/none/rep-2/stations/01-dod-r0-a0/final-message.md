Committed and pushed the `direct` acceptance tests in commit `2e9f491`. The branch is up to date with `origin/main` and its upstream.

The three tests fail for the reported missing validation:

```text
rejects invalid input before execution without exposing values and preserves valid input
  Expected pattern: /location/i
  Received string: "forecast"

compiles static schemas at registration and reuses them
  Expected pattern: /weather/i
  Received function did not throw

validates each dynamic definition against its current schema
  Expected pattern: /location/i
  Received string: "forecast"

Tests: 3 failed, 3 total
```

The DoD also records the tool-loop integration, documentation, packaging, and release work still owed. The repository’s current Lore test-list script does not expose a `spec` descriptor field; the new spec links directly to each test instead.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}