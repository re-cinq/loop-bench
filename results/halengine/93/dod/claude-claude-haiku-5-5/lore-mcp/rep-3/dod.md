# Definition of Done

> so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The seam exists: `createChatOrchestrator` takes a scripted `AIProvider` and an `afterModelResponse` hook, so a test can drive two tool rounds through the real `processMessage` and read the usage the hook receives.

## Done when these pass

- [ ] **reports the usage of every provider call in a turn that ran two tool rounds** — a scripted provider reports 15, 27 and 39 total tokens across three rounds; the hook must receive their sum, 81, not the final round's 39
      `src/orchestration/usageAcrossRounds.acceptance.test.ts`
- [ ] **counts the rounds that reported and leaves the total undefined when no round reported** — a round that reports no usage is skipped, not zeroed or `NaN`; a turn where no round reported still hands the hook `undefined`
      `src/orchestration/usageAcrossRounds.acceptance.test.ts`

## Facets

- [ ] Accumulate usage across every provider call in `processMessageStream` (`src/orchestration/chatOrchestrator.ts`), replacing `lastUsage = outcome.usage ?? lastUsage`: add each reporting round, skip rounds that report nothing, stay `undefined` when none reported.
- [ ] Say in the type that the hook's usage is the turn total: document it on `OrchestratorHooks.afterModelResponse` and `UsageMetadata` in `src/types/ai.ts`, with no `any` added to the public API.
- [ ] Keep the no-tool-call path reporting exactly what it reports today: the existing test "receives collected response text and usage" in `src/orchestration/chatOrchestrator.test.ts` stays unedited and green.
- [ ] Replace the under-counting line in `specs/hal-engine-config-hooks/spec.md` with the summed behaviour, and put its `validated by` link on the new statement, pointing at the first test above.
- [ ] Add a CHANGELOG entry under Unreleased → Changed stating that existing consumers record a larger number for tool-heavy turns, and that this is a MINOR bump.

## Out of scope

- The second shape the ticket weighed: passing the summed total plus a per-round breakdown. Not chosen. It widens the public surface for a consumer that wants provider-call granularity, and no such consumer is named; a later ticket can add it if one appears.
- The audit entry or billing record itself, which is a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape, which providers already populate and this ticket only aggregates.
- The type-level clarity criterion (criterion 4 of the ticket) has no runtime acceptance test. It is covered by the doc facet above and the typecheck in CI.
- The `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint` and `npm run prettier:check` gate in the ticket. CI runs those on every push. The red bar here was run by Jest directly on the new file.