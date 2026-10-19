Branch is up to date. Here's what this round fixed:

**ESLint `callee-below-caller`** — `createSession` and `registryReturning` were declared above `runTurn` in `chatOrchestrator.acceptance.test.ts`, violating the rule. Moved both below `runTurn`.

**ESLint `require-spec-link`** + **`spec-names`** — Adding imports in the previous round shifted every test in `chatOrchestrator.test.ts` down by 7 lines. Updated 14 stale line anchors in `specs/hal-engine-architecture/spec.md` and 2 in `specs/hal-engine-config-hooks/spec.md` (all +7 offset).

No new tests were written this round (this was a CI-fix round only). This round ran no tests here.

Regressions: 0 tests were mine; 0 were pre-existing regressions. Unrelated smells noticed: none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix callee-below-caller and stale spec anchors causing ESLint and spec-names CI failures","tdd_next":"acceptance green"}}