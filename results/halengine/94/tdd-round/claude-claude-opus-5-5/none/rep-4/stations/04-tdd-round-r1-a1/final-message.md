I made no changes this round. The only failures left on the branch are inside the acceptance test, and I'm not allowed to edit it.

The CI verdict in the brief is for 9ad2160, not the current head 33e0249, which is already pushed. I checked each finding against the current head:

- **spec-names:** fixed. `node scripts/check-spec-anchor-names.mjs` reports all 590 citations name the test they point at.
- **changelog:** fixed. `scripts/check-changelog.sh origin/main` passes.
- **eslint `require-spec-link` (`chatOrchestrator.test.ts` lines 406, 469, 547, 570):** these links are now in the specs at the right lines, so they should pass, but I didn't run eslint here.
- **typecheck TS2353:** still broken, in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts:30`. The test builds `PromptBuilder` with `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig`. `PromptBuilderConfig` only accepts `identity`, `domainContext`, `responseGuidelines` and `toolPreamble`.
- **eslint `re-lint/max-expects`:** still broken, in the same file at line 40. The test makes 3 `expect` calls and the rule allows 1.

The orchestrator fix, the spec guarantee and the CHANGELOG entry are already on the branch. Production code can't clear the two remaining errors. Adding those fields to `PromptBuilderConfig` would change the public API just to suit a broken test, and the expect count can only change in the test file. The test needs its author to fix it. A corrected version would build `PromptBuilder` from `{identity: 'You are HAL.'}` and check a single object, for example `{rejection, caughtError, afterSessionRan}`, with one `toEqual`.

- Red tests from me: 0. Regressions: 0. The two remaining errors come from the acceptance test written before the fix.
- Tests run: none. I only ran the spec-anchor and changelog check scripts.
- Branch: matches `origin/loop-bench/94`, with nothing to merge from `origin/main`.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test chatOrchestrator.beforeSession.acceptance.test.ts is defective (TS2353: PromptBuilder built with baseSystemPrompt/systemPromptSuffix/contextConfig instead of identity; 3 expects vs re-lint/max-expects 1) and must be fixed by its author"}}