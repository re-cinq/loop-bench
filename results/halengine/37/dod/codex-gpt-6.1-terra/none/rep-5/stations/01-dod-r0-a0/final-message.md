Committed and pushed four red acceptance tests using the `direct` strategy. The branch is up to date with `origin/main` and its upstream.

The targeted Jest run reported:

```text
Expected pattern: /location/i
Received string:  "forecast"

Expected pattern: /weather/i
Received function did not throw

Expected pattern: /city/i
Received string:  "forecast"

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

The failures show that malformed input reaches the executor and an invalid static schema is accepted at registration. The remaining implementation and documentation obligations are recorded in [.lore/dod.md](/var/tmp/loop-bench/runs/1b3a05cc89dd/workspace/target/.lore/dod.md).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}