Done. Both CI findings were in the acceptance test file only — the orchestrator fix itself (`beforeSession` inside the `try`), the spec, and the CHANGELOG from the previous commit were all green.

**What was broken and fixed** (`src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`):

1. **typecheck TS2353 (line 30)** — the test built `PromptBuilder` with `{baseSystemPrompt, systemSuffix, contextConfig}`, none of which exist on `PromptBuilderConfig` (which is `{identity, domainContext?, responseGuidelines?, toolPreamble?}`). Replaced with `new PromptBuilder({identity: 'You are HAL.'})`, the same shape every other test in the repo uses. The prompt builder is incidental here — `beforeSession` throws before any prompt is built.

2. **eslint `re-lint/max-expects` (40:3)** — the test had 3 expects (max 1). Restructured with the repo's own established pattern from `chatOrchestrator.test.ts:15-17` (`outcomeOf`, "One expect per test needs the rejection as a value rather than a matcher"): the rejection is captured as a value and one `expect({outcome, caughtError, afterSessionRan}).toEqual({...})` pins all three acceptance properties — the caller still sees the original rejection message, `onError` received the thrown error, and `afterSession` ran. No assertion was weakened or dropped.

**Verification:** ran only the affected suite with the repo's own test command — `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` → 1 suite, 1 test passed. `npx prettier --write` on the file reported it already unchanged (formatted). No lint, typecheck, or build was run in this pod, per the pod constraints.

**Landed:** committed as `01e6921` (`test(orchestrator): fix acceptance test config shape and max-expects`) and pushed; `origin/main` merged in (already up to date, no conflicts); `git status` confirms the branch is up to date with `origin/loop-bench/94` and the tree is clean.

The graph had no prior recorded failures on either named file, so there was no earlier fix diff to reuse.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used a nonexistent PromptBuilderConfig shape (typecheck TS2353) and 3 expects against re-lint/max-expects; rebuilt the PromptBuilder with {identity} and collapsed to one toEqual via the repo's outcomeOf pattern"}}