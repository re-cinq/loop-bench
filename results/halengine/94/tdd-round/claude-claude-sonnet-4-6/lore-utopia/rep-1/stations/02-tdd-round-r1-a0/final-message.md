All 3 facets are checked. The acceptance test (`chatOrchestrator.beforeSession.acceptance.test.ts`) is now fixed — it uses the correct `PromptBuilder` config, has 1 expect instead of 3, and the spec file has correct line numbers and new spec statements for the unlinked tests.

**What was fixed this round (all from the CI failure list):**
- `typecheck`: Fixed wrong `PromptBuilder` config in acceptance test (`baseSystemPrompt` → `identity`); fixed `Promise<number>` type errors in unit test (`void callOrder.push(...)`)
- `eslint`: Consolidated 3 expects to 1 in acceptance test; added spec links for tests at L231, L295, L381
- `spec-names`: Updated stale `#L194` → `#L216` for "replaces system prompt" test  
- `spec-links`: Same fix plus updated `#L40` → `#L32` for the acceptance test after PromptBuilder compaction

0 regressions. The DoD facets were already ticked by the previous round; this round fixed the compilation and lint failures blocking the acceptance test.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix all CI failures (typecheck, eslint, spec-names, spec-links) blocking the acceptance test","tdd_next":"acceptance green"}}