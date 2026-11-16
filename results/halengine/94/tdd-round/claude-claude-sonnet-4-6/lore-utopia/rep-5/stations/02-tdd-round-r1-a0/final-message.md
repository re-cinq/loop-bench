Branch is up to date. The push landed.

**What I fixed this round:** Three CI failures in the acceptance test file from the previous round — a TypeScript compilation error (`baseSystemPrompt` → `identity` to match `PromptBuilderConfig`), a `re-lint/max-expects` violation (collapsed 3 expects into one `toEqual` using the `outcomeOf` pattern), and a `re-lint/require-spec-link` violation (added the acceptance test citation alongside the existing one in `specs/hal-engine-config-hooks/spec.md`). No assertions were changed; the behavior under test is identical.

**Smells noticed but not fixed:** The duplicate test at `chatOrchestrator.test.ts#L116` added by the previous round covers the same behavior as the acceptance test. It's not a bug but could be cleaned up in a future pass.

0 regressions (I wrote no new test; the round fixed CI violations in an existing one).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI violations in acceptance test (typecheck + eslint)","tdd_next":"acceptance green"}}