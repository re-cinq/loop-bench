Branch is up to date. The untracked `coverage-check/` and `coverage-orch/` directories are jest coverage output artifacts I generated locally — not part of the commit.

**What this round did:** The CI failure was a branch coverage threshold: `src/orchestration/` needed 80.85% branches but had 78.33% because `registry.ts`'s `get()`, `has()`, `getPromptInstructions()`, and the enum-fallback path in `formatValidationErrors` were entirely untested. Added 5 new unit tests covering those branches (raising tools branch coverage from 64% to 76%), with spec citations in `specs/hal-engine-tool-input-validation/spec.md` under a new "Tool registry lookup" section. All 404 tests pass and all coverage thresholds pass locally.

0 regressions. 0 new tests failed.

Unrelated smells noticed but not acted on: `coverage-check/` and `coverage-orch/` directories were left by the coverage runs — they should likely be in `.gitignore` but that's out of scope for this ticket.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"orchestration branch coverage threshold (get/has/getPromptInstructions/enum-fallback branches covered)","tdd_next":"acceptance green"}}