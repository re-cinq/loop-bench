Committed and pushed `cb7d69a`. A `beforeSession` failure now reaches `onError` and `afterSession`; the spec and changelog describe the cleanup behavior.

The test added this round failed before the fix and passed afterward. Red tests: 1 mine, 0 regressions. Acceptance tests are for CI to judge.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Run cleanup hooks when beforeSession throws, with the spec and changelog updated","tdd_next":"acceptance green"}}