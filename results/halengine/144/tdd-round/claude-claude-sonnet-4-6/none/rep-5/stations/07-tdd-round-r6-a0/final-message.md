Fixed the ESLint `re-lint/no-nested-if` violation at line 59 of `conversationList.acceptance.test.ts` by hoisting the `pong` check as a flat early return before the `connected` check, then committed and pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix ESLint nested-if in acceptance test","tdd_next":"acceptance green"}}