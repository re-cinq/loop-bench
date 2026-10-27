Implemented and pushed `7bd63eb` (`feat(ws): dispatch session list requests`). The handler receives the session store, answers list requests outside the session lock, and serializes summary dates. The one test I added passed. Formatting and `git diff --check` passed; the branch is up to date with its upstream.

The previous CI verdict still needs attention: the brief reports failures in eslint, test, spec-names, and changelog, but truncates the findings. Lore’s CI lookup returned 404 for the branch and PR, so I could not identify or fix all of them. I did not run acceptance tests. Red tests authored this round: 0; regressions: unknown from the available CI report.

The next round should resolve the outstanding CI findings, then continue with protocol spec documentation.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"thread sessionStore into createMessageHandler and dispatch list_sessions outside the lock","tdd_next":"resolve outstanding CI findings, then document list_sessions and session_list"}}