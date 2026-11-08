# Definition of Done

> `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.
>
> For a turn that answered directly, that is the whole turn. For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — The seam already exists on `ChatOrchestrator`: the `afterModelResponse` hook is called after the round loop with `lastUsage`. A test can drive two or more tool rounds using a scripted provider with known token counts and observe the usage passed to `afterModelResponse`.

## Done when these pass

- [ ] **sums the usage of every round, not only the last** — two tool rounds report `{inputTokens: 10, outputTokens: 5, totalTokens: 15}` and `{inputTokens: 20, outputTokens: 7, totalTokens: 27}`; the hook must receive the sum `{inputTokens: 30, outputTokens: 12, totalTokens: 42}`. Fails today because only the last round's `{inputTokens: 20, outputTokens: 7, totalTokens: 27}` is passed.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

- [ ] **counts every reporting round even when a round between them reports none** — three rounds report `{inputTokens: 10, outputTokens: 5, totalTokens: 15}`, nothing, and `{inputTokens: 1, outputTokens: 2, totalTokens: 3}`; the hook must receive `{inputTokens: 11, outputTokens: 7, totalTokens: 18}`. Fails today because the hook receives `{inputTokens: 1, outputTokens: 2, totalTokens: 3}`, and pins that an unreporting round neither drops earlier counts nor turns the total into `NaN`.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

## Facets

- [ ] Red: the two acceptance tests fail because `chatOrchestrator.ts` reports only the last round's usage.
- [ ] Green: accumulate usage across rounds in `chatOrchestrator.ts`, summing `inputTokens`, `outputTokens`, and `totalTokens` when reported, and pass the sum to `afterModelResponse`.
- [ ] Preserve: confirm turns with no tool calls report their single round unchanged (pinned by existing test `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts`), and turns where no rounds report usage pass `undefined`.
- [ ] Type & Docs (implementer): make the signature / type unambiguous (e.g. `totalUsage?: UsageMetadata`), update CHANGELOG for the behaviour change in recorded usage for tool-heavy turns, and verify the spec statements in `specs/hal-engine-config-hooks/spec.md`.

## Out of scope

- The audit entry or billing record itself, which is a consumer's concern.
- Token accounting for anything other than provider calls made by the orchestrator.
- The `stop` chunk's own `usage` shape, which providers already populate.
- The CHANGELOG entry and type documentation (owned by the implementer round).