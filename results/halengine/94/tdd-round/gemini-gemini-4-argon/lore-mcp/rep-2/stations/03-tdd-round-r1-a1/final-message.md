All implementation facets in `.lore/dod.md` are completed, and no regressions were introduced by our changes (0 red tests of ours, 0 regressions).

However, CI failed on `typecheck` and `eslint` exclusively inside the acceptance test file `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` (authored in commit `962a4fce`):
1. **Typecheck (`TS2353` at line 30):** `new PromptBuilder({ baseSystemPrompt: ..., systemPromptSuffix: ..., contextConfig: ... })` passes properties that do not exist on `PromptBuilderConfig` (which takes `{ identity: string; domainContext?: string; responseGuidelines?: string; toolPreamble?: string }`).
2. **ESLint (`re-lint/max-expects` at line 40):** The acceptance test contains 3 `expect(...)` calls in a single `it(...)` block instead of asserting a single object (maximum 1 `expect` call allowed per test).

Per instructions ("Never edit an acceptance test to make it pass — if an acceptance test is wrong, stop and say so; that is a failed round"), I have made no changes and ran no tests in this round.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts is wrong: it fails typecheck (passes invalid baseSystemPrompt/systemPromptSuffix/contextConfig to PromptBuilderConfig) and eslint (3 expect calls violating re-lint/max-expects)"}}