Committed and pushed `f84d27e`. Bare `list_sessions` validation now accepts requests and strips client `userId`.

One new test went red, then green; no regressions reported. Acceptance tests were not run. Branch is current with `main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accept bare list_sessions requests and strip client userId","tdd_next":"Validate list_sessions limit and before cursor"}}