# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — The seam exists: `createChatOrchestrator` takes a provider and an `afterModelResponse` hook, and a scripted provider can report known usage per round without any mock library. The tests assume the first shape the ticket weighs: one `usage` argument carrying the sum across every provider call in the turn. The "pass both" shape was not chosen; if an implementer picks it, these assertions move with the signature, not with the behaviour.

## Done when these pass

- [ ] **reports the summed usage of every provider call in a turn that ran two tool rounds** — three provider calls report 120, 340 and 560 tokens; the hook must receive their sum (900 in, 120 out, 1020 total), not the final round's 560
  `src/orchestration/usageAcrossRounds.acceptance.test.ts`
- [ ] **leaves out a round that reports no usage, and reports nothing when no round reports** — a round that reports nothing neither erases nor poisons the total (150 in, 25 out, 175 total from the two rounds that reported), and a turn where no round reports hands the hook `undefined`
  `src/orchestration/usageAcrossRounds.acceptance.test.ts`
- [ ] **guard, existing, must stay unedited:** `receives collected response text and usage` — a turn with no tool calls reports exactly what it reports today
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [x] Accumulate usage across every provider call in `processMessageStream`, skipping rounds that report none, and keep `undefined` when none reported (`src/orchestration/chatOrchestrator.ts`, the `lastUsage` local)
- [x] Make the type say the turn total: document `afterModelResponse`'s `usage` argument as the turn sum (`src/orchestration/chatOrchestrator.ts`, `OrchestratorHooks`)
- [x] Replace the under-counting line in `specs/hal-engine-config-hooks/spec.md` with the new behaviour; the spec statements there carry no `validated by` link, so no anchor is added in this ticket
- [x] CHANGELOG entry stating that existing consumers will record larger numbers for tool-heavy turns, with a MINOR bump note

## Out of scope

- The per-round breakdown (the "pass both" shape), which was weighed and not chosen
- The audit entry or billing record itself, which is a consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape; providers already populate it
- The `onError` gate on `instanceof Error`, recorded in the same spec as a separate measured semantic
- The type-level clarity criterion, which is a compile-time property reviewed in the diff and checked by `npm run typecheck`, not a runtime assertion
- The build, lint, format and full-suite gates, which CI runs on every push