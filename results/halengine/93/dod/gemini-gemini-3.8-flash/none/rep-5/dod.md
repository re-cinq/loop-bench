# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.
>
> For a turn that answered directly, that is the whole turn. For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — the seam already exists. `createChatOrchestrator` accepts an `afterModelResponse` hook in `OrchestratorHooks`. A test can drive a turn through multiple tool rounds using a scripted provider with known usage and observe that `afterModelResponse` receives only the final round's usage today rather than the sum across all provider calls. No new module is needed.

## Done when these pass

- [ ] **reports usage summed across every provider call in a turn with multiple tool rounds** — a turn driven through two tool rounds and a final answering round reports usage summed across all three provider calls, covering each call with known, distinct token counts. Fails today because `chatOrchestrator.ts` reports only the final provider call's usage (35/12/47 instead of 65/25/90).
      `src/orchestration/afterModelResponseUsage.acceptance.test.ts`

- [ ] **accumulates usage across tool rounds when some rounds omit usage** — a turn where some provider rounds omit usage still accumulates the rounds that reported usage, and a turn where no provider calls report usage reports `undefined`. Fails today because earlier reporting rounds are overwritten when later rounds report usage (reporting 25/10/35 instead of 35/15/50).
      `src/orchestration/afterModelResponseUsage.acceptance.test.ts`

## Facets

- [ ] Accumulate usage metadata across rounds in `src/orchestration/chatOrchestrator.ts`, adding inputTokens, outputTokens, and totalTokens whenever a round reports usage.
- [ ] Ensure that if no rounds report usage, the aggregated usage remains `undefined`.
- [ ] Update the signature / type documentation of `afterModelResponse` so that what the hook receives is unambiguous.
- [ ] Confirm existing tests remain green, specifically verifying that a turn with no tool calls reports the single call's usage unchanged.
- [ ] In `specs/hal-engine-config-hooks/spec.md`, replace the under-counting statement in "Measured semantics — out of scope" with the aggregated usage statements in "Installing hooks through config", and add a CHANGELOG entry documenting the behaviour change for consumers.

## Out of scope

- Token accounting for anything other than the provider calls the orchestrator makes.
- The consumer's audit entry or billing record itself.
- Changing the `stop` chunk's own `usage` shape.