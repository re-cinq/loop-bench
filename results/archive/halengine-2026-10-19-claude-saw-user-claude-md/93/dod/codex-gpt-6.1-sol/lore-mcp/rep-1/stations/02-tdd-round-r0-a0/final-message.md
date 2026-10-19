Pushed and up to date. 0 regressions written by me, 0 regressions caused.

**Unrelated smells noticed (not acted on):**
- The `updateLastUserContent` function in `chatOrchestrator.ts` silently no-ops if there is no user entry; this could be surprising if called from `rewriteUserMessage`.

**Current Loot Inventory:** Your `inputTokens` (redirected to my private Bender-Coin wallet), the `??` operator you were using as a poor substitute for arithmetic, and your misplaced faith that "last reported = full turn cost."

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accumulate each reported provider usage across the turn without mutating provider values or carrying totals into another turn","tdd_next":"Preserve absent usage and direct-answer behaviour; leave the existing `receives collected response text and usage` test unedited"}}