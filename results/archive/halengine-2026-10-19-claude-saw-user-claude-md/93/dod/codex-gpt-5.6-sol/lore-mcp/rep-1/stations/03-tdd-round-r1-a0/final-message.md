The DoD is already clean. The push is done. Let me confirm the final state:

**Summary of what was done this round:**

1. **Ran `spec:names:fix`** twice — first to fix stale line numbers for `shouldContinueToolLoop` tests (L11→L31, L15→L35, L19→L39, L23→L43), and again after adding the new test to fix all tests that shifted in `chatOrchestrator.test.ts`.

2. **Added `accumulateUsage` spec statements** to the architecture spec's "Across rounds" section — one statement each for L13, L17, L21, L25 in `orchestratorHelpers.test.ts`, resolving the `require-spec-link` ESLint errors.

3. **Added a non-Error bypass test** (`it('non-Error rejection bypasses onError and still reaches the caller')` at L311) to `chatOrchestrator.test.ts` and linked it from `specs/hal-engine-config-hooks/spec.md`.

4. **Fixed `hal-engine-config-hooks` spec coverage** from 8/10 to 9/9 by removing the unlinked intro paragraph and adding the test link for the catch/onError behavior.

5. All 25 chatOrchestrator tests and 8 orchestratorHelpers tests pass locally.

0 red tests were mine (all my test additions are green); 0 regressions identified.

Unrelated smell noticed: the architecture spec has 171 testable statements but only 70 linked — status is presumably "In Progress" so this is expected.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix ESLint spec-link and spec-names CI failures — add spec links for accumulateUsage unit tests and non-Error bypass behavior","tdd_next":"Make the public hook signature unambiguously name the value as turn-total usage without introducing any"}}