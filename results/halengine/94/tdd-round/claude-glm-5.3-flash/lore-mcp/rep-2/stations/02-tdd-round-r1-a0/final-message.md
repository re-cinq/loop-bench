Pushed and landed: `3bafdba` is on `origin/loop-bench/94`, the branch is up to date with its upstream, and the merge from `origin/main` was a no-op (no drift, no conflicts).

**What this round did** — the round brief named two CI findings on `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` from push `f5bee58`, and both are repaired:

- **typecheck** — the test built `PromptBuilder` from `{baseSystemPrompt, systemPromptSuffix, contextConfig}`, none of which exist on `PromptBuilderConfig` (whose real shape is `{identity, domainContext?, responseGuidelines?, toolPreamble?}`). Now `new PromptBuilder({identity: 'You are HAL.'})`, matching the sibling tests.
- **eslint `re-lint/max-expects`** — the single test carried three expects (limit 1). Split into three one-expect tests, one per acceptance criterion: `still rejects the caller when beforeSession throws`, `hands a beforeSession throw to onError`, `runs afterSession after a failed beforeSession`. Assertions are unchanged in substance — the same error instance reaches `onError`, `afterSession` still runs, the rejection still propagates.
- **Spec links** — the old citation named a test that no longer exists, so `specs/hal-engine-config-hooks/spec.md` line 26 now cites all three new tests; `node scripts/check-spec-anchor-names.mjs --fix` reports 10 citations naming the tests they point at, 0 needing repair. Prettier on the test file reports unchanged. `.lore/dod.md` records the repair as a ticked facet.

**Tests run here: none.** The test I repaired is the file `.lore/dod.md` lists as its acceptance test, and the pod's hook reserves that for CI — I verified by reading against the real interfaces instead. CI's jest/typecheck/eslint verdict on this push is what confirms the round; nothing here was a regression (the two red findings were this branch's own test file, not pre-existing tests).

Unrelated smells noticed, not acted on: the spec still records the `instanceof Error` gate and the `lastUsage` under-count (both out of scope per the ticket).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair acceptance test CI findings (PromptBuilder config shape, max-expects split + spec citations)","tdd_next":"acceptance green"}}