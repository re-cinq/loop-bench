Implemented and pushed `9883cbd` on `loop-bench/144`; the branch is clean and up to date with its upstream, and `origin/main` was already merged.

The focused handler test went red, then green, including after the helper refactor. **One red test was mine; zero regressions were identified in the brief.** I did not run acceptance tests, lint, or typecheck. The previous CI brief did not name the failing test, and the trace-query tool was unavailable. Updated the spec links manually; no reanchor script exists.

Unrelated smells noticed: none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add session list message types, handler wiring and dispatch, and protocol documentation","tdd_next":"acceptance green"}}