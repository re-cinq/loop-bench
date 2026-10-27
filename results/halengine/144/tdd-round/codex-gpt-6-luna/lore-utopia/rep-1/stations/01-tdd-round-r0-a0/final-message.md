Implemented and pushed one red–green–refactor round: the validator accepts a bare `list_sessions` frame. The focused test failed before the change and passed afterward. **One red test was mine; zero regressions were identified.**

Added the incoming message type and export, linked the test to the spec, and updated the DoD checklist. Formatted the changed TypeScript files. Commit `2e75c18` is pushed; the branch is clean and up to date with `origin/main`. CI lookup returned 404, so no prior CI verdict was available.

The ticket text says `list_conversations`, while this branch’s DoD and acceptance tests specify `list_sessions`; this round followed the branch DoD.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"bare list_sessions validation","tdd_next":"full list_sessions paging/validation"}}