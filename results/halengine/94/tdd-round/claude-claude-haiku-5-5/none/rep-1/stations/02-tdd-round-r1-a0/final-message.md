The ticket is blocked on the acceptance test itself, so this round ends as failed. I pushed the docs work, but I did not fix the two CI findings that sit in the acceptance test.

**What I did this round**
- **Spec** (`specs/hal-engine-config-hooks/spec.md`): moved the `beforeSession` bullet out of "Measured semantics — out of scope" into a new "A throwing `beforeSession`" section. It states the guarantee, links the acceptance test, and records the decision on `afterSession`: it runs after a failed `beforeSession` because it is the release half of the pair, and the hook gets no flag saying the turn never started. The section also says what a hook can assume: no input rewrite, provider call, or tool ran. The "Measured semantics" heading now lists two properties, not three.
- **CHANGELOG** (`Changed`): documents that a throwing `beforeSession` now runs `onError`, `afterSession` and `sessionStore.save`, and carries a migration note for existing consumers. This fixes the `changelog` CI finding.
- **`.lore/dod.md`**: ticked the spec and CHANGELOG facets.
- Committed as `docs(orchestrator): record beforeSession throw semantics` and pushed. `origin/main` had no new commits, so no merge was needed, and the branch is in sync with its upstream.

**What is blocked**
The CI verdict on `09ad9c7` names two findings, both in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`:
- `30,3` typecheck: `baseSystemPrompt` is not a property of `PromptBuilderConfig`. The real fields are `identity`, `domainContext`, `responseGuidelines` and `toolPreamble`. The test also passes `systemPromptSuffix` and `contextConfig`, which the type does not declare.
- `40:3` eslint `re-lint/max-expects`: the test has three `expect` calls against a limit of one.

These findings are in the acceptance test, and my instructions say never to edit an acceptance test and to stop when one is wrong. I did not change the test or add fields to `PromptBuilderConfig` to match it. The fix is for the ticket owner to correct the test's constructor config and merge its assertions into one `toEqual`/`toMatchObject`.

**Test accounting**
- No test was written or run this round. Both facets were docs, so the round had no red phase.
- CI verdict on the last push: 3 red checks (typecheck, eslint, changelog). The changelog one is fixed by this push. The typecheck and eslint ones are in the acceptance test, not in source. None of the red findings is a regression I caused: 0 red tests I wrote, 0 regressions.
- The Jest acceptance test was not run in this pod.

**Unrelated smells noticed, not acted on**
- The `onError` gate on `instanceof Error` (out of scope per the ticket) is still in place.
- The spec's `beforeModelResponse` and `afterModelResponse` bullets are not in this ticket's scope.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"acceptance test chatOrchestrator.beforeSession.acceptance.test.ts is wrong: typecheck (PromptBuilderConfig has no baseSystemPrompt, line 30) and eslint max-expects (3 expects, line 40); needs correcting by its owner"}}