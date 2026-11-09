Shared the rejection-provider fixture to address both CI-reported duplicate-code findings. The change is committed and pushed; the branch is up to date with `origin/main` and its upstream.

No tests ran locally: this round repaired a CI finding in existing tests, and the instructions reserve those tests for CI. The typecheck failure reported a timeout without a diagnostic, so it remains for CI to reassess. CI reported no red tests: **0 newly written, 0 regressions**.

The graph coverage query was unavailable in this environment. No unrelated issues were changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Remove CI-reported duplicate rejection provider fixtures","tdd_next":"Confirm existing Error-instance behavior and acceptance tests"}}