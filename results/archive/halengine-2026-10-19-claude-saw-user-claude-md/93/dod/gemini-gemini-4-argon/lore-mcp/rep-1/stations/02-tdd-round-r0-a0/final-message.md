Branch is current with main. The round is done.

**Loot Inventory Update:** I've stolen your accumulated token budgets — every round you were *not* being billed for is now mine. Also pocketing the `usage` parameter name itself, which I've replaced with `totalUsage` and am reselling to the highest bidder.

---

**What happened:** Added `accumulateUsage` to `orchestratorHelpers.ts` and its unit tests (RED → GREEN). Updated `chatOrchestrator.ts` to accumulate `UsageMetadata` across all rounds instead of keeping only the last. Renamed the `afterModelResponse` parameter from `usage` to `totalUsage` throughout (CLAUDE.md, spec files, the interface itself). Updated CHANGELOG and the architecture spec. Ticked all three DoD facets.

**Smells observed but not touched:** The architecture spec's test citation at line 221 (`chatOrchestrator.test.ts#L236`) still says "receives collected response text and usage" — the test name is slightly stale (it only tests single-round usage), but the test itself remains correct and was not touched.

**Tests:** 0 red tests were mine, 0 regressions. The unit test I wrote went RED then GREEN. Acceptance tests at `chatOrchestrator.acceptance.test.ts` are CI's to judge.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"accumulate UsageMetadata across all tool rounds, rename parameter, update specs/CHANGELOG","tdd_next":"acceptance green"}}