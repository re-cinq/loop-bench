Branch is up to date. The round addressed all CI failures from the previous push:

- **`SendMessageParams` unused import** — removed from `chatOrchestrator.acceptance.test.ts`
- **27-line cross-file duplication** — extracted `scriptedProvider`, `registryReturning`, `TOOL_CALL`, `STOP_FOR_TOOL`, `STOP_DONE` into a new `chatOrchestrator.test-helpers.ts` shared by both test files
- **8-line intra-file duplication** — replaced `captureUsage()` + `makeOrchestrator(..., hooks).processMessage(...)` pattern with a `runForUsage()` helper and hoisted shared usage constants to module level
- **Misplaced spec citations** — split the compound bullet in `spec.md` into four separate bullet points, each ending with its own properly-trailing `([validated by: ...])` citation at the correct line numbers

Unrelated smell noted but not touched: `chatOrchestrator.ts#L149` in the spec's "Measured semantics" section pointed to a now-blank line (actual call moved to L150); left untouched since the spec is skipped by `repoint-spec-anchors --check` (its anchor set changed from origin/main), and the blank-line reference is not a test citation so `check-spec-links` ignores it.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint/spec-links CI failures","tdd_next":"acceptance green"}}