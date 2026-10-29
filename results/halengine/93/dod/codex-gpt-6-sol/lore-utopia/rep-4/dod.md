# Definition of Done

> `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` accepts a real scripted provider, tool registry, and `afterModelResponse` hook. The tests drive two tool rounds through `processMessage` and observe what the hook receives.

## Done when these pass

- [ ] **sums every provider call across two tool rounds** — the hook receives the sum of all three provider calls exactly once.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **counts reported rounds when another omits usage and leaves an entirely unreported turn undefined** — missing rounds contribute nothing, while a turn with no usage remains unreported.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate each provider call's reported input, output, and total tokens across the turn; preserve `undefined` when no call reports usage.
- [ ] Preserve the existing no-tool behavior pinned by `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` without editing that test.
- [ ] Give the hook's public usage parameter a type and name that explicitly describe summed turn usage; use no `any`.
- [ ] Update the spec's under-counting statement to the delivered behavior and record the consumer-visible change, the rejected per-round-breakdown option, and a MINOR bump in the changelog.
- [ ] Let CI run the build, full test suite, typecheck, lint, and format gates.

## Out of scope

- Audit and billing records built by consumers, token accounting outside orchestrator provider calls, and the provider `stop` chunk's usage shape.