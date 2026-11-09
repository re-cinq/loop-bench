Committed and pushed `7da7d3a`: bare `list_sessions` validation.

One test went red → green and passed after refactoring. No regressions observed; CI history was unavailable. Acceptance tests were not run.

Branch is current with main and upstream; working tree is clean. Unrelated finding: existing acceptance-test spec anchors appear stale and were left unchanged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accept bare list_sessions requests","tdd_next":"Validate list_sessions limit and before pagination fields"}}