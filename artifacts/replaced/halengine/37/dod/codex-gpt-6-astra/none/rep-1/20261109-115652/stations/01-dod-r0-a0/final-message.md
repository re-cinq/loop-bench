Committed and pushed `d996d34` using `direct`. Three acceptance tests fail on missing validation:

```text
Expected substring: "location"
Received string:    "forecast"

Expected pattern: /weather/
Received function did not throw

Expected pattern: /number/
Received string: "{\"location\":\"private-dynamic@example.test\"}"

Tests: 3 failed, 3 total
```

Added spec links and `.lore/dod.md`. The stub-provider loop-test conflict is documented there. No production code changed. Branch is clean, pushed, and current with `main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}