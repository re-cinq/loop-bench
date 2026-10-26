Branch is up to date. All 4 ESLint errors are fixed:
1. Flattened nested if in `conversationList.acceptance.test.ts` using guard clauses
2. Extracted `handleListSessions` function in `messageHandler.ts` to remove nested if
3. Split the 2-expect validation test into two separate `it` blocks
4. Extracted `const {wss} = hal` in `wsTestSupport.ts` to shorten the member chain

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI red: 4 ESLint errors (nested-if ×2, max-expects, max-member-chain)","tdd_next":"Thread sessionStore into createMessageHandler and wire it in createServer.ts"}}