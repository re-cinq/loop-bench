The branch is up to date. The push landed successfully.

**Summary of changes:**
- `src/orchestration/chatOrchestrator.acceptance.test.ts`: Extracted `TOOL_CALL` as a module-level constant and added `captureUsage()` / `twoRoundOrchestrator()` helpers. This eliminated the duplicate code blocks that ESLint flagged (`re-lint/no-duplicate-code`) and removed the consecutive trailing `// No usage` comments that triggered `re-lint/max-comment-lines`.
- `specs/hal-engine-config-hooks/spec.md`: Split the single compound statement into 4 separate spec statements, each with a validated-by link pointing to the correct acceptance test line. This satisfies `re-lint/require-spec-link` for all four acceptance tests.

No regressions introduced (0 tests written this round, 0 regressions to report). Smells noticed but not touched: `SendMessageParams` import in the acceptance test file is unused (the provider's `sendMessage` doesn't reference the param type directly).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI failures: deduplicate acceptance tests and add spec links","tdd_next":"acceptance green"}}