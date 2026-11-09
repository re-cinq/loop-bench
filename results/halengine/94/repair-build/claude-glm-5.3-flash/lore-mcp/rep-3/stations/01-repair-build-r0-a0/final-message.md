Both findings are fixed, pushed, and the branch is clean and in sync with its upstream.

**What CI judged (c3cd08a):** both failures were in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` — the orchestrator fix itself (`beforeSession` moved inside the `try`) and the spec/CHANGELOG updates were already correct from the previous round.

**Fixes applied (commit `c0bc54d`, pushed):**
1. **typecheck** — `chatOrchestrator.beforeSession.acceptance.test.ts:30` built a `PromptBuilder` from keys that don't exist on `PromptBuilderConfig` (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`). The real config is `{identity, domainContext?, responseGuidelines?, toolPreamble?}`, so it now reads `new PromptBuilder({identity: 'You are HAL.'})`, matching the idiom in `chatOrchestrator.test.ts`.
2. **eslint** — `40:3 re-lint/max-expects`: three expects folded into one object assertion `expect({outcome, caughtError, afterSessionRan}).toEqual({...})`, the remediation the rule itself prescribes and the repo's existing pattern (`error path calls onError then afterSession` in `chatOrchestrator.test.ts`).
3. **Consequence repair** — moving the `it(` from line 40 to 32 would have rotted the spec's citation, and CI gates that (`Spec citations name their test` and `Spec anchor check`). Repointed `specs/hal-engine-config-hooks/spec.md` `#L40 → #L32` with the repo's own `node scripts/check-spec-anchor-names.mjs --fix`; it repointed exactly 1 of 589 citations, and both gates now exit 0.

**Verified locally:** `npm test -- src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` → 1 suite, 1 test passed; `node scripts/repoint-spec-anchors.mjs --check origin/main` → exit 0; `node scripts/check-spec-anchor-names.mjs` → exit 0. Prettier on the changed `.ts` file reported it unchanged. Per the pod rules I did not run eslint, tsc, or a build — the two findings were named file-and-line by CI, and the changed gate scripts above are cheap node scripts, not the linter.

One honest note: the single-expect rewrite asserts the `onError` argument with `toEqual` (message/name equality) instead of the old `toBe` identity — that is the lint rule's prescribed fix and the repo's idiom; the criterion asks that `onError` fire "with the same argument shape as any other orchestrator failure", which this pins, and the rejection message the caller sees is still asserted exactly.

`git status` reports the branch up to date with `origin/loop-bench/94`, working tree clean; `origin/main` was already an ancestor, so no merge was needed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used a PromptBuilderConfig shape that never existed (typecheck) and held 3 expects against max-expects (eslint); fixed both and repointed the spec's test anchor to the moved it()"}}