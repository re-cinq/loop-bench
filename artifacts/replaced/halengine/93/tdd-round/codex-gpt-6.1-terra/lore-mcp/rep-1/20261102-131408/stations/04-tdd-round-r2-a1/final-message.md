Committed and pushed the round as `dbd2e54`. The hook now names its argument `totalUsage` and exposes a documented `TurnUsage` type. Aggregation also snapshots the first report, so a provider reusing its usage object cannot overwrite earlier counts. The reported lint finding was repaired.

The new focused test failed before the fix and passed afterward. That was one red test written this round; no regression tests were identified. The previous CI test failure remains unidentified: its log was truncated, and Lore denied access to the full verdict and coverage graph. No unrelated smells were acted on.

The branch is up to date with `origin/main` and is not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Make the public hook usage contract explicit and snapshot reported usage","tdd_next":"Preserve the unchanged no-tool regression guard"}}