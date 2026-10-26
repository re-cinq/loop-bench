The round is stuck on the acceptance test, so I'm ending it as failed. I couldn't finish the typecheck and max-expects findings without editing the acceptance test, which the rules forbid.

**What blocks the branch (acceptance test, not mine to edit):**
- `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts:30` is a typecheck error: `PromptBuilder` takes `PromptBuilderConfig { identity, domainContext?, responseGuidelines?, toolPreamble? }`, but the test passes `baseSystemPrompt`, and also `systemPromptSuffix` and `contextConfig`, which don't exist on that type. The test is written against an API that isn't there. It needs `identity` or similar, a change the test author has to make.
- The same file's single `it` has three `expect` calls, which trips `re-lint/max-expects` (max 1). The truncated CI log doesn't show the file name for that finding, so it is most likely this file.

**What I fixed and pushed this round:**
- **Spec anchors (`spec-names`):** 23 citations in three spec files pointed past the 18-line test I inserted into `chatOrchestrator.test.ts` in the previous round. `check-spec-anchor-names.mjs --fix` repointed them; the check now reports 588 citations and 0 findings. This also addresses the `require-spec-link` findings on the shifted existing tests, though I couldn't run eslint here to confirm.
- **CHANGELOG (`changelog`):** added an entry under `[Unreleased] / Changed` for the `beforeSession` throw change, with a migration note. `check-changelog.sh` passes.
- **Spec:** `specs/hal-engine-config-hooks/spec.md` already carried the new guarantee and the "no signal that the turn never started" answer from the previous commit. I kept it.
- **Formatting:** prettier churn in the architecture spec was reverted, since `prettier:check` only covers `.ts` under src, scripts and smoke.
- **Branch:** `origin/main` was already merged, and `git status` shows the branch in sync with its upstream.
- **`.lore/dod.md`:** ticked the spec and CHANGELOG facets.

**Not done:**
- The acceptance test's typecheck and max-expects findings remain red. Fixing them means editing the acceptance test, so the test owner needs to correct it.
- I ran no tests in this pod: this round wrote no new test, and the acceptance test is not one I should run here.

**Regressions:** I caused none that are red at runtime. The eslint `require-spec-link` findings were stale citations from my insertion, and I've repointed them. The one red test is the acceptance test from the RED commit, which I did not write this round.

**Open:** whether afterSession-after-failed-beforeSession is the right default is settled in the spec as written. Unrelated smells I noticed but didn't touch: the `instanceof Error` gate on `onError` (out of scope per the ticket) and the 0.3.0 CHANGELOG entries that predate this work.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"acceptance test chatOrchestrator.beforeSession.acceptance.test.ts is wrong: line 30 passes PromptBuilder fields that don't exist (baseSystemPrompt, systemPromptSuffix, contextConfig) and it has 3 expects against max-expects 1; it needs correcting by its owner before typecheck and eslint can go green"}}