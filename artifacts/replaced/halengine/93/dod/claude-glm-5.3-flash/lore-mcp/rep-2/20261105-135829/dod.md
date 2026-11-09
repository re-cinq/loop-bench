# Definition of Done

> `afterModelResponse` is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` takes a scripted provider, a `ToolRegistry` and hooks, exactly as `src/orchestration/chatOrchestrator.test.ts` already drives it. The acceptance tests call the real entry point (`processMessage` with an `afterModelResponse` hook) and fail on the usage the hook is handed, so no production scaffolding is needed to test the claim.

## Done when these pass

- [ ] **hands the hook the usage of every provider call in the turn, not only the last round** — a turn driven through two tool rounds (three provider calls) whose rounds report known, different token counts reports usage covering every call; RED today, receiving the last round's 30/40/70 instead of the sum 190/70/260.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **still counts the rounds that reported when another round reports none** — a missing round report must not turn the total `undefined`/`NaN`: one reported round, one silent round, one final round reports the reported round's 100/10/110. GREEN today (today's carry-through coincides with the sum here); it is the guard that catches an accumulator letting the silent round poison the total.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **still reports no usage when no round of the turn reports one** — a turn where nothing reported still reports nothing, and does not invent a zero total. GREEN today (today's carry-through already reports `undefined`); it is the guard that must stay green through the fix.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Accumulate in the orchestrator (`src/orchestration/chatOrchestrator.ts`): sum each field over the rounds that reported usage; when no round reported, keep reporting `undefined`. Turns the first test green without moving either guard.
- [ ] Existing suite stays unedited and green: `receives collected response text and usage` (`src/orchestration/chatOrchestrator.test.ts:236`, the no-tool turn pinned exactly as today), `keeps the usage an earlier round reported when a later round reports none` (`src/orchestration/chatOrchestrator.test.ts:527`, already green under both carry-through and sum), and `hands afterModelResponse text ending in the sentence, and the usage of a run without the hook` (`src/orchestration/toolBudget.test.ts:214`).
- [ ] Make the type say the answer (criterion 4): the hook signature must declare the sum unambiguously — a distinct named turn-total type, or the summed `usage` plus a per-round breakdown. The tests above pass under either offered shape; a wrapper replacing the third argument is excluded because it breaks the unedited no-tool test. Regenerate the `OrchestratorHooks` doc-block in `specs/hal-engine-architecture/spec.md` after the signature change (`check-doc-blocks` gates CI) and re-read its `usage the provider reported` statement for staleness.
- [ ] CHANGELOG entry under `[Unreleased]` stating the change in what an existing consumer records (tool-heavy turns now record more), with the MINOR bump the repo's breaking-change rules ask for.
- [ ] CI is the judge for `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint` (`--max-warnings 0`) and `npm run prettier:check`; none of those are run in this pod (OOM headroom).

## Out of scope

- The audit entry or billing record itself, token accounting for anything other than the provider calls the orchestrator makes, and the `stop` chunk's own `usage` shape (ticket tech notes).
- Settling the shape question between "sum, one `usage` argument" and "sum plus per-round breakdown" — the implementing round decides and records why in the PR; the tests pin only what both share, that the summed usage reaches the hook.
- `specs/hal-engine-architecture/spec.md`'s cited statements (the hook receives the usage the provider reported; an earlier round's usage survives a silent round) — both stay green as written; only its embedded doc-block regenerates with the signature.