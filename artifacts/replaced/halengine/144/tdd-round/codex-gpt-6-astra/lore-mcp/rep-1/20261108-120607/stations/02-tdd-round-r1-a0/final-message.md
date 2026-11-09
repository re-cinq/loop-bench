The acceptance test is wrong: it requires an empty `session_list` when `listFor` is absent, but ticket #144 explicitly requires an `UNSUPPORTED` error and forbids an empty-list fallback.

Per your instruction, I stopped without editing acceptance tests or implementation. No tests ran, no commits were pushed, and no new red tests or regressions were introduced. The supplied CI log is truncated, so existing regression counts cannot be determined.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test requires an empty list for missing listFor, contradicting ticket #144's required UNSUPPORTED error; acceptance contract needs correction."}}