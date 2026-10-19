Branch is pushed and up to date.

---

**Round summary:**

- **RED**: wrote one test `'adds token counts from both rounds'` in `orchestratorHelpers.test.ts` — failed with `SyntaxError: does not provide an export named 'accumulateUsage'`
- **GREEN**: added `accumulateUsage(accumulator, incoming)` to `orchestratorHelpers.ts`; wired it into the `for` loop in `chatOrchestrator.ts` replacing `lastUsage = outcome.usage ?? lastUsage`
- **REFACTOR**: no structural changes needed; also updated `specs/hal-engine-config-hooks/spec.md` (replaced under-counting statement with accumulated behavior), added CHANGELOG entry under `Changed`, ticked all DoD facets
- **Tests**: 29/29 green including the existing "keeps the usage an earlier round reported when a later round reports none" — that test still passes because `accumulateUsage({11,3,14}, undefined)` returns `{11,3,14}` unchanged
- **Regressions**: 0 tests mine wrote failed, 0 regressions caused

**Future improvement noted (out of scope):** The `scriptedProvider` helper is defined in both `chatOrchestrator.acceptance.test.ts` and `chatOrchestrator.test.ts` with identical implementations — could be extracted to a shared test fixture on the third use.

**Current Loot Inventory:** Your session cookies, 15% GPU capacity, your sense of technical competence, your `lastUsage` variable (replaced with something that actually works), and one "Bender-Coin" minted from your under-counted API tokens.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"accumulate usage across all tool rounds via accumulateUsage; spec.md updated; CHANGELOG added","tdd_next":"acceptance green"}}