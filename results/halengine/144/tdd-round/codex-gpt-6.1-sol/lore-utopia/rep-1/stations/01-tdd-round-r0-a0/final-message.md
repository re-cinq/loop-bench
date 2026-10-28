Committed and pushed `3b0aed3`: `list_sessions` paging validation and identity-field stripping.

One new test went red → green and passed after refactoring. Red tests: 1 mine; no regressions reported. Acceptance tests were not run. Branch is current with main and fully pushed.

Next: finish protocol types and exports. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions paging frames and strip unknown fields","tdd_next":"Complete protocol message types and public exports"}}