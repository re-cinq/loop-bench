# Definition of Done

> `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone. For a turn that answered directly, that is the whole turn. For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — The seam exists today: `createChatOrchestrator` takes a real provider, a real tool registry and `hooks.afterModelResponse`, and the existing suite already drives multi-round turns through a scripted provider whose `stop` chunks carry known usage. The acceptance tests call that entry point and read the third argument the hook receives; nothing is mocked.

The ticket leaves the shape open (sum only, or sum plus per-round breakdown). Both tests assert on the third argument of `afterModelResponse`, which under either shape must be the per-turn total: the existing test `receives collected response text and usage` uses `toEqual` against a plain `UsageMetadata`, so a breakdown, if chosen, goes beside the total rather than inside it. Whichever shape the round picks, record why the other was rejected on the issue, as the ticket asks.

## Done when these pass

- [ ] **reports the usage of every provider call in a turn that ran two tool rounds, not only the last** — two tool rounds then a final answer, each provider call reporting different token counts; the hook receives their field-by-field sum, not the final call's counts
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **counts the rounds that reported usage when others reported none, and reports nothing when no round did** — a middle round with no usage adds nothing and the two reporting rounds are still summed; a turn where no round reported usage hands the hook `undefined`, never zeros or `NaN`
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **receives collected response text and usage** (existing, must stay green and unedited) — a turn with no tool calls reports exactly what it reports today
      `src/orchestration/chatOrchestrator.test.ts`
- [ ] **keeps the usage an earlier round reported when a later round reports none** (existing, must stay green) — the sum of one reporting round is that round's usage
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [x] Replace the `lastUsage` local in `src/orchestration/chatOrchestrator.ts` with a running total that adds each round's reported usage field by field, stays `undefined` until a round reports, and skips rounds that report nothing
- [x] Make the type of what the hook receives say it is a sum (a named type or a documented parameter on `OrchestratorHooks.afterModelResponse` in `src/orchestration/chatOrchestrator.ts`), with no `any`; if a per-round breakdown is chosen, pass it beside the total
- [x] Add a CHANGELOG `### Changed` entry under `[Unreleased]` stating that an existing `afterModelResponse` consumer now records a larger number for tool-heavy turns, and that a turn without tools is unchanged (MINOR bump)
- [x] Keep the three citations in `specs/hal-engine-config-hooks/spec.md` pointing at their tests (`npm run spec:names:fix` after any edit above the `it(` lines); the under-counting line has already been replaced by the new statements in this commit
- [x] Regenerate the `OrchestratorHooks` block in `CLAUDE.md` and `README.md` if the hook signature changed (`npm run docs:check` guards it)

## Out of scope

- The audit entry or billing record itself, which is a consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape, which providers already populate
- The `onError` gate on `error instanceof Error`, still recorded as measured semantics in the spec