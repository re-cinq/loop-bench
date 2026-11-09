Committed and pushed `81735eb`: bare `list_sessions` validation strips client identity fields.

One test went red, then green after implementation and refactoring. Zero observed regressions; CI status was unavailable. Acceptance tests were not run. Branch is clean and current with `main`.

Next: paging validation. No unrelated smells addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accept bare list_sessions requests and strip client identity","tdd_next":"Validate list_sessions limit and before paging fields"}}