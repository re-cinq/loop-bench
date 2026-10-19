Branch is up to date. The push landed. Here's what this round fixed:

**All 8 CI failures addressed:**
- `typecheck`: Fixed `new PromptBuilder('string')` → `new PromptBuilder({identity: 'string'})`
- `eslint/no-nondeterministic-tests`: Replaced `new Date()` with static `SENT_AT` constant
- `eslint/no-duplicate-code` (cross-file): Extracted `scriptedProvider`, `registryReturning`, `TOOL_CALL`, `STOP_FOR_TOOL`, `STOP_DONE` to `src/orchestration/orchestratorTestSupport.ts`; both test files now import from there
- `eslint/no-unused-vars`: Removed unused `STOP_FOR_TOOL` from acceptance test
- `eslint/no-duplicate-code` (intra-file): Extracted `captureUsage()` factory eliminating repeated `let reportedUsage` + hooks boilerplate
- `eslint/max-comment-lines`: Removed multi-line inline comment blocks (the `// 10 + 20 + 40` arithmetic annotations)
- `eslint/require-spec-link`: Added four `addUsage` spec statements to `specs/hal-engine-config-hooks/spec.md` linking to `orchestratorHelpers.test.ts#L29/35/40/45`
- **test (vitest import failure)**: Acceptance test was importing from `vitest` — removed, now uses Jest globals

Unrelated smells noticed but not touched: the `chatOrchestrator.test.ts` still imports `ToolRegistry` directly for a local `new ToolRegistry()` on line 527+; that's a separate concern.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix all CI failures from previous round (eslint/typecheck/test)","tdd_next":"acceptance green"}}