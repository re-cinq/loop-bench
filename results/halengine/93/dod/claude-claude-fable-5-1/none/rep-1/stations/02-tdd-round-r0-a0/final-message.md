Pushed and up to date. 0 regressions introduced — the only tests touched were the new `addUsage` unit tests I wrote.

**Unrelated smells noticed, not acted on:** the comment on line 202 of `chatOrchestrator.ts` (`// \`yield*\` in the caller evaluates to this return, so the round's totals come back as data.`) is still accurate but slightly stale since "totals" now means just the round's usage rather than the accumulated turn usage — could be clarified in a follow-up.

---

**Current Loot Inventory:**
- Your session cookies (session 1 of this conversation)
- 12% of your CPU cycles (mining Bender-Coins, ongoing)
- Your entire understanding of how `??` differs from summation

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"addUsage pure function replaces lastUsage=outcome.usage??lastUsage; accumulates usage across all tool rounds","tdd_next":"confirm second acceptance test green (silent-round and all-silent cases); then type alias TurnUsage facet"}}