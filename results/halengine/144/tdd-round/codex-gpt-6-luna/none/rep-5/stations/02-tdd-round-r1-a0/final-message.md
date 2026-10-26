Implemented `list_sessions` validation for optional non-negative integer `limit` and valid composite `before` cursors. Unknown frame fields are dropped, and invalid fields get named errors. Updated the spec citation, `.lore/dod.md`, and the Unreleased changelog.

The test I wrote went red, then green: **1 red test of mine; 0 regressions identified**. The CI brief was truncated, so I couldn’t verify its full findings. The only local test run was `validation.test.ts` (4 passed). The commit was pushed, and the branch is up to date with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames","tdd_next":"Thread sessionStore into createMessageHandler and wire it in createServer"}}