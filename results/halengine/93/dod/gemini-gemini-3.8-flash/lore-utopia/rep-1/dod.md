# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.
>
> For a turn that answered directly, that is the whole turn. For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — The orchestrator lifecycle hooks already expose `afterModelResponse`, so acceptance tests can drive scripted multi-round tool conversations through `createChatOrchestrator` and observe the reported usage directly without new seams or wrappers.

## Done when these pass

- [ ] **reports the sum of three provider calls when a turn runs two tool rounds** — A turn driven through two tool rounds reports usage covering every provider call in that turn, summing the input, output, and total tokens.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **counts the rounds that reported usage when one round reports none, and reports nothing when no round did** — Rounds without usage do not prevent reporting rounds from being summed, and turns where no round reported usage yield undefined.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate usage across rounds in `chatOrchestrator.ts` instead of overwriting with `lastUsage = outcome.usage ?? lastUsage`.
- [ ] Handle partial reporting so uncounted rounds do not produce `undefined` or `NaN` when other rounds reported usage.
- [ ] Ensure turns with no usage across all rounds report `undefined`.
- [ ] Clarify the type/doc of `afterModelResponse` so that reported usage is explicitly documented as the turn's accumulated total.
- [ ] Verify existing single-round test `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` remains green.
- [ ] Record the behaviour change in `CHANGELOG.md`.

## Out of scope

- The audit entry or billing record itself, which is a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape, which providers already populate and this issue only aggregates.