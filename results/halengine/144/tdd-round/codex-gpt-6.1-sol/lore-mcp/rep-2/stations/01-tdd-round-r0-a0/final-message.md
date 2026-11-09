Committed and pushed `6e73ba9`: bare `list_sessions` validation strips client `userId`.

One test went red, then green; no regressions observed. Acceptance tests were not run. Branch matches upstream and is current with main.

Next: pagination validation. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accept bare list_sessions requests and strip client userId","tdd_next":"Validate list_sessions limit and before pagination fields"}}