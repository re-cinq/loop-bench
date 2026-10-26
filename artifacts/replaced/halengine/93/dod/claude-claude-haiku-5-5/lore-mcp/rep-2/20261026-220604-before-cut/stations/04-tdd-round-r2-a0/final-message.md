Branch is up to date and clean. 

**What this round fixed:**
- The primary CI failure was 7+ ESLint `require-spec-link` errors in `chatOrchestrator.test.ts`. The root cause was that 23 spec citations in `hal-engine-architecture/spec.md` had drifted line numbers after earlier test insertions — `check-spec-anchor-names --fix` repointed them all. I also added the missing statements to `hal-engine-config-hooks/spec.md` as belt-and-suspenders coverage.
- Completed the type-rename DoD facet: added `export type TurnUsage = UsageMetadata` to `src/types/ai.ts`, changed `afterModelResponse`'s third parameter type to `TurnUsage` in `OrchestratorHooks`, and exported it from `src/index.ts`.
- All DoD facets are now ticked.

**No regressions introduced** — 0 tests written by me, 0 regressions. The `spec-names` CI failure was caused by stale `#Lnn` pointers; the repoint script resolved all 23 in one pass.

**Unrelated smells noticed:** None observed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"type rename (TurnUsage) + repair 23 stale spec anchor line numbers fixing eslint/spec-names CI failures","tdd_next":"acceptance green"}}