Implemented static schema compilation at registration, with errors naming the tool, and cached validators for function-provided schemas. Updated the spec, DoD checklist, and tests; also addressed the listed CI typecheck and lint findings.

The new registration test failed before the change and passed afterward. **Red tests: 1 ours; regressions: 0.** I did not rerun acceptance tests, typecheck, or lint. The commit was pushed, and the branch is up to date with `main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static tool schemas at registration and cache function-produced schemas","tdd_next":"Validate tool input before executor invocation and finish the remaining validation docs and tests"}}