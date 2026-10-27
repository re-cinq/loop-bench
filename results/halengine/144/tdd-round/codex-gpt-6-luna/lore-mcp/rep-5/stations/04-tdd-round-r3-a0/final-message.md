Committed and pushed `cdc0d35` (`fix(ws): handle session list frames`); the branch is up to date with its upstream. The `list_sessions` test passed. The first test invocation used the wrong ESM setup and ran no tests; the corrected, deadline-bounded invocation passed.

Fixed the reported typecheck and lint issues, corrected the stale spec links, and checked off the handler and documentation facets. No acceptance tests were run. Red tests: **0 ours, 0 regressions**.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle list_sessions dispatch and errors","tdd_next":"acceptance green"}}