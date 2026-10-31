Implemented and pushed `fbd5ed6` to `loop-bench/144`.

Scoped tests passed: 32/32 across the CI-named test files. The session-list WebSocket handler now calls the store with the authenticated socket user, serializes summaries, and handles store errors.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Implemented session-list WebSocket handling and resolved the reported test-helper lint violations"}}