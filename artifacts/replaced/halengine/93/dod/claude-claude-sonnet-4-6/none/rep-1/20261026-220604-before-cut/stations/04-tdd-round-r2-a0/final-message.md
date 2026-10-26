Branch is pushed and up to date. Let me note any unrelated smells observed:

**Unrelated smells noticed (not acted on):**
- The MongoDB tests (`mongoRedaction.test.ts`, `mongoDurability.test.ts`, `mongoConnection.test.ts`) fail locally due to no MongoDB connection — these are pre-existing infrastructure failures unrelated to this ticket. The `test` CI failure in the round-brief appears to be from these tests, not from my changes (the acceptance tests and orchestratorHelpers tests both pass locally).

**What this round fixed:**
- `eslint: no-duplicate-code` — extracted `runAndCapture()` helper in the acceptance test to eliminate 7 lines duplicated between the two tests
- `eslint: require-spec-link` — restructured spec.md line 28 to put all 6 `([validated by: ...])` test links inside a single trailing parenthetical (the `require-spec-link` rule and `check-spec-links.mjs` both scan only the trailing paren of each statement)
- `spec-links: misplaced` — same fix; `findMisplacedCoverageLinks` now reports 0 misplaced links
- Rotten anchor `chatOrchestrator.ts#L148` — updated to `#L149` where the `afterModelResponse` call now lives

Red tests: 0 were mine; pre-existing Mongo infrastructure failures are not regressions from this branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix spec link placement and duplicate-code violations from CI","tdd_next":"acceptance green"}}