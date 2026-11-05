Committed and pushed `e8e82ab`: bare `list_sessions` validation strips supplied `userId`.

One test went red, then green after implementation and refactoring. Regressions observed: 0; CI verdict unavailable. Acceptance tests were not run.

Branch is current with main, fully pushed, and clean. Next: pagination validation. Unrelated smells: none noted.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accept bare list_sessions requests and strip client-supplied userId","tdd_next":"Validate and preserve optional limit and before pagination fields"}}