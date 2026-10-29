Committed and pushed the `list_sessions` validation round (`6d02136`). The test I wrote failed first, then passed after implementation and refactor. One red test was mine; there were zero reported regressions. The branch is up to date with `origin/main` and its upstream.

The ticket describes different frame names and fallback behavior from `.lore/dod.md`; I followed the branch’s acceptance brief for this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames","tdd_next":"Add and export session list message types"}}