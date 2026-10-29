# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` already accepts a provider, a real tool registry, and an `afterModelResponse` hook. A scripted provider can expose the usage delivered after two tool rounds without changing the production seam.

## Done when these pass

- [ ] **reports the sum of every provider call with usage and nothing when no call reports it** — three provider calls across two tool rounds contribute their known token counts; absent reports are ignored and an entirely unreported turn remains `undefined`.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

## Facets

- [ ] Accumulate each reported round's input, output, and total tokens before calling `afterModelResponse` once.
- [ ] Make the hook's public usage type explicitly describe the turn total without `any`; preserve the existing no-tool result and its unedited test.
- [ ] Explain the chosen aggregate signature and why a per-round breakdown was not selected.
- [ ] Update the config-hooks spec to describe the implemented total and add a changelog entry stating the changed amount existing consumers record, with the appropriate MINOR version bump.
- [ ] Pass the repository CI gates for build, tests, typecheck, lint, and formatting.

## Out of scope

- A consumer's audit or billing record, token accounting outside provider calls, and the provider's stop-chunk usage shape.
- The unrelated `onError` behavior for non-`Error` rejections recorded in the same spec.