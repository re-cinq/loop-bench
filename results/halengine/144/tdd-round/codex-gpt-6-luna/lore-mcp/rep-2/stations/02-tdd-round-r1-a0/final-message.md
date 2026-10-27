Implemented and pushed commit `b5b9614`. The message handler now receives the session store, answers `list_sessions` outside the turn lock for the authenticated user, and serializes summary dates. I also added the outgoing frame types and updated the checklist, conversation-list spec, and changelog.

The test I wrote failed before the implementation and passed afterward; the handler test file passed all 55 tests. Red tests: **1 mine, 0 regressions**. The prior CI report also flagged lint issues in the acceptance test, which I left untouched as required. The repository has no spec-link reanchor script; I checked the new citation against the test title. The branch is clean, pushed, and up to date with `main`.

Next facet: finish the protocol and conversation-list documentation, then continue the remaining history configuration work.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into createMessageHandler and handle list_sessions outside the session lock","tdd_next":"Complete the protocol and conversation-list documentation and remaining history configuration work"}}