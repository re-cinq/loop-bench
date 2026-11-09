Green round complete. Both CI findings were in the acceptance test file, not in the fix itself — the `beforeSession`-inside-`try` change from c3cd08a was already correct.

**What was red → what I did** (both findings in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`):

1. **typecheck** `30:3 'baseSystemPrompt' does not exist in type 'PromptBuilderConfig'` — the test built a `PromptBuilder` with keys that don't exist on the config (`promptBuilder.ts:1-6` takes `identity`, plus three optionals). Replaced with `{identity: 'You are HAL.'}`, matching the convention already used at `chatOrchestrator.test.ts:51`. The unknown keys never mattered to the assertions.
2. **eslint** `40:3 Test has 3 expect calls (max 1)` — collapsed the three asserts into one object assertion (`{rejection, onErrorGotTheThrownError, afterSessionRan}` via `toEqual`), the exact pattern the rule's message suggests and `chatOrchestrator.test.ts:15-17,132` already uses: the rejection is captured as a value with a small local `outcomeOf` helper, and `onErrorGotTheThrownError: caughtError === errorToThrow` keeps the identity check the old `toBe` had.

**Spec link drift**: the edit moved the `it(` from line 40 to 36, so `specs/hal-engine-config-hooks/spec.md:17` cited a stale `#L40`. Repointed with the repo's own `scripts/check-spec-anchor-names.mjs --fix`, then re-ran the check — all 8 citations name the tests they point at.

**Verified locally**: ran only the two affected suites (`chatOrchestrator.beforeSession.acceptance.test.ts` + `chatOrchestrator.test.ts`) — 25 passed. Prettier over both changed files reported unchanged. No lint/typecheck/build were run in this pod, per the pod constraints.

Pushed as `df4feaf`; branch is up to date with `origin/loop-bench/94`, and `origin/main` merged cleanly (already up to date).

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used a PromptBuilderConfig shape that doesn't exist (identity, not baseSystemPrompt) and had 3 expects where the suite allows 1; rewrote to one object assertion and repointed the spec citation, typecheck+eslint findings cleared"}}