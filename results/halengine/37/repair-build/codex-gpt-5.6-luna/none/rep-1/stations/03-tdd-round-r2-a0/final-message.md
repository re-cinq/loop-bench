Branch is up to date. The push landed cleanly.

**What happened:** The CI was failing because `src/orchestration/` statement coverage (87.93%) was below the 88.3% threshold. The uncovered lines were 90-91 in `registry.ts` (the unknown-tool throw path). I added a unit test `'throws for an unknown tool name'` in `registry.test.ts` and a citation for spec.md line 15 (the "unregistered name throws" statement). All 395 tests now pass locally with no threshold violations.

**Regressions:** 0 regressions, 1 new test was mine.

**Smells noticed but not touched:** `conversationContext.ts` has many uncovered lines (29-44, 59-60, 64, 72) — not related to this ticket.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"unknown-tool throw unit test and spec link (fixes coverage threshold failure)","tdd_next":"remaining unit tests: static-schema-compiled-once, function-valued-per-call-validation, chatOrchestrator retry test, doc updates (DoD facet 4)"}}