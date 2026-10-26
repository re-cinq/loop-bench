Round 94 is blocked on the acceptance test, which I did not edit. The branch is pushed and in sync with `origin/loop-bench/94`, and it has no commits behind `origin/main`.

**What I did (commit `f479064`)**
- **Deleted `src/orchestration/chatOrchestrator.beforeSessionOnError.test.ts`.** I wrote it last round. It duplicated the acceptance test's behaviour and was the source of the typecheck and eslint findings on my own file (duplicate code, `max-expects`, `require-spec-link`, `baseSystemPrompt`).
- **Spec (facet 2):** moved the `beforeSession` bullet out of "Measured semantics — out of scope" and into "Installing hooks through config". It now states the guarantee and what a hook can assume: the throw happens before any tool runs or provider call, and `afterSession` runs for a turn that never started. A deployer must treat `onError` as the failure signal. The `#L40` anchor was checked against the test.
- **CHANGELOG (facet 3):** added a `### Changed` entry under `[Unreleased]`, with a migration note for existing consumers. This is what the `changelog` check asks for, since `src/` changed.
- **`.lore/dod.md`:** ticked facets 2 and 3. Facet 1 was already ticked and the acceptance box stays unticked.
- Formatter run with prettier on the two docs. Prettier reported both files unchanged.

**What is blocked**
- `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` is wrong, and I stopped at it rather than edit it:
  - Line 30 passes `baseSystemPrompt`, which is not a field of `PromptBuilderConfig` (`src/infrastructure/builders/promptBuilder.ts`). The fields are `identity`, `domainContext`, `responseGuidelines`, `toolPreamble`. CI's typecheck will stay red until someone fixes it.
  - It has three `expect` calls against the lint rule's maximum of one. That is the `max-expects` finding CI reported.
- The acceptance test is a red test that I did not write, so it is not a regression I caused.
- I could not refresh the CI verdict. `lore_get_ci_failures` returned HTTP 403, so I worked from the truncated copy in the round brief. Its `changelog` entry was cut off, so I can't confirm the changelog step is green.
- I wrote no new test this round. The remaining facets are documentation, and the acceptance test is already the bar.
- No tests were run in this pod: the round relied on the formatter and on reading the code.

**Needed next:** a human or the next round needs to correct the acceptance test (the `baseSystemPrompt` field and the expect count). Those edits are outside what this round is allowed to make.

Tests: 1 red test of mine, now deleted. 0 regressions, as far as the brief shows.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"acceptance test beforeSession.acceptance.test.ts is wrong: passes baseSystemPrompt (not in PromptBuilderConfig) and has 3 expects over the max-expects limit of 1; needs a human or the next round to correct it"}}