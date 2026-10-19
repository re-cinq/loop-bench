All changes committed and pushed. The branch is clean and up to date.

**What this round fixed** (all were lint failures from the previous push):
- `re-lint/no-duplicate-code`: Extracted `scriptedProvider`, `TOOL_CALL`, `STOP_FOR_TOOL`, `STOP_DONE` to a new `src/orchestration/testHelpers.ts` shared module — both test files now import from there instead of duplicating the definitions. Internal repetition across the three acceptance tests was eliminated with a `runAndCaptureUsage` helper.
- `re-lint/require-spec-link`: Added spec statements in `specs/hal-engine-config-hooks/spec.md` for "reports correct usage for a single round turn" (→ L58) and "ignores rounds with missing usage in the total" (→ L70), satisfying the inline-link requirement for both.
- `spec-names`: Ran `check-spec-anchor-names.mjs --fix`, which repointed every stale `#Lnn` citation in three spec files (including the pre-existing `#L42` → `#L39` shift caused by the added import line, and all the architecture spec citations that moved when the local helper block was removed from `chatOrchestrator.test.ts`).

**Regressions**: 0. One `chatOrchestrator.test.ts` test ran green to verify the import refactoring. **Unrelated smells noticed**: none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix lint failures: no-duplicate-code, require-spec-link, spec-names","tdd_next":"acceptance green"}}