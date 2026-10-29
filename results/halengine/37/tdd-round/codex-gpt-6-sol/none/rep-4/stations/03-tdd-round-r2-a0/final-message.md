Committed and pushed one round (`2849ed8`). The new test went red, then passed after the registry began naming rejected property paths without exposing values. I also addressed the four type errors and the wrong-type failure reported by the previous CI run; CI has not yet checked this push.

Only the test written this round was run. It is green. Red-phase tests: 1 mine, 0 regressions. `origin/main` was already current, and the branch is fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate input before invoking the executor and report failing paths and constraints without leaking values","tdd_next":"Add remaining unit tests and update tool documentation"}}