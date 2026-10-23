The CHANGELOG finding is fixed and pushed, but the other two CI findings are in the acceptance test file, and I did not edit that file.

**What's stuck:** `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` is wrong, so CI's typecheck and eslint steps stay red.
- Typecheck (line 30): the test passes `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig` to `PromptBuilder`, but `PromptBuilderConfig` only has `identity`, `domainContext`, `responseGuidelines` and `toolPreamble`.
- Eslint (line 40): `re-lint/max-expects` allows one expect per test, and this `it` has three.

Fixing either means editing the acceptance test, which the rules forbid. The fix belongs to the test's owner.

**What landed this round:**
- The `beforeSession` move into the `try` block was already committed in `b6542d7`, and `specs/hal-engine-config-hooks/spec.md` already has the new guarantee at line 26, with the "what a hook can assume" answer. I ticked that facet in `.lore/dod.md`.
- The CHANGELOG `[Unreleased]` / Changed section now has an entry for existing consumers. It covers the new `onError` and `afterSession` firing, that `save` also runs, the migration note for hooks that assumed a provider call happened, and that `onError` still gates on `Error`. I ticked that facet.
- Commit `9606638` is pushed. The branch is not ahead of its upstream, and the merge with `origin/main` produced nothing new.

**Test accounting:** I wrote no test this round. The CHANGELOG facet is documentation, and a test on its prose would pin repo text, which the rules forbid. No red test here is mine. The three CI findings are the acceptance test's own problems, and the changelog finding was a real gap that is now fixed. I found no regressions. No tests were run in this pod.

**Smells noticed, not fixed:** the spec's "Measured semantics — out of scope" intro still says "This issue changes none of them", which is now false for `beforeSession`.

**Next:** the acceptance test needs correcting by its owner (remaining unchecked facet in `.lore/dod.md`). Then CI should go green.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"acceptance test chatOrchestrator.beforeSession.acceptance.test.ts is wrong: typecheck rejects its PromptBuilderConfig keys and eslint max-expects fails its 3 expects; it must be corrected by its owner"}}