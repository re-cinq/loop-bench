Implemented one facet: `list_sessions` frame validation, including optional non-negative integer `limit`, cursor validation, and stripping unknown fields. The new bare-frame test failed before the change and passed afterward.

Committed and pushed `326aceb`; the branch is synced with its upstream, and `origin/main` was already up to date. Lore could not provide a CI verdict (404 for the branch and PR). I did not run acceptance tests. No regressions were identified; the next facet is threading the session store into the message handler. The message type additions are partial and remain unchecked in the DoD.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames","tdd_next":"Thread sessionStore into createMessageHandler and wire it in createServer"}}