Everything is landed. Final state:

**What was red and what I fixed** — both findings were in the acceptance test this branch added, `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`:

1. **typecheck (`test.ts:30`, TS2353)** — the test constructed `PromptBuilder` with an invented config shape (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`). The real `PromptBuilderConfig` is `{identity, domainContext?, responseGuidelines?, toolPreamble?}`. Replaced with `new PromptBuilder({identity: 'You are HAL.'})`, matching the idiom every other test in the repo uses.
2. **eslint (`test.ts:40`, `re-lint/max-expects`)** — one test carried 3 expects against a max of 1. Collapsed them into a single `toEqual` on a collected object, the same pattern this branch already established in `chatOrchestrator.test.ts`. Nothing was weakened: the object still asserts the caller sees the rejection with the original message, that `onError` received *exactly* the thrown `Error` (an identity check, `caughtError === errorToThrow`, so a same-message clone would fail), and that `afterSession` ran.
3. **Spec link re-point** — `re-lint/require-spec-link` matches a test by the spec's `[validated by](file#Lnn)` link falling inside the test's line span. Collapsing the expects moved the `it` from line 40 to line 35, so I updated `specs/hal-engine-config-hooks/spec.md` from `#L40` to `#L35`; leaving it would have traded the lint error for a new "unlinked test" failure.

**What I ran and what passed:** `jest src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` → 1 suite, 1 test, passed. `npx prettier --write` on the changed test file → "unchanged", already conformant. Per the pod's constraints I did not run `eslint` or `tsc --noEmit` locally — CI judges those on the push.

**Delivery:** committed as `test(orchestrator): fix acceptance test config and expect count` and pushed; `origin/main` merged in (already up to date, no drift, no conflicts); `git status` reports the branch up to date with `origin/loop-bench/94` and the tree clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used a PromptBuilderConfig shape that does not exist (TS2353) and had 3 expects where re-lint/max-expects allows 1"}}