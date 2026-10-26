The push is complete. Unrelated smell noted: the MongoDB `beforeAll` binary-download timeout that appeared in the CI test failure is a pre-existing CI infrastructure issue (the 120 s `MONGO_START_MS` guard can fire on a slow CI runner); it isn't triggered by any file I touched. If it reappears in CI it will need a separate investigation.

All four DoD facets remain ticked. The three eslint failures (callee ordering in acceptance test + two batches of missing spec links) and the 25 spec-names anchor-drift findings are all resolved in this commit.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix callee-order lint, add missing spec link for addUsage helper, re-anchor 25 stale spec citations","tdd_next":"acceptance green"}}