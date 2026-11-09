# Definition of Done

> "A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it."

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` is the real entry point, `afterModelResponse` the real hook, and a scripted provider whose rounds report known counts is the repo's established way to drive a multi-round turn (`scriptedProvider` in `chatOrchestrator.test.ts`, `budgetEngine` in `toolBudget.test.ts`). The acceptance tests call all three today and fail on the behaviour: the hook receives the last round's usage alone.

The tests pin the **sum** on the hook's existing third argument. That is the only shape the ticket's own second criterion permits: `chatOrchestrator.test.ts` "receives collected response text and usage" must stay green **unedited**, and it deep-equals the third argument against a bare `UsageMetadata`, so a wrapper object (`{total, rounds}`) as that argument would break it. Whether the per-round breakdown is also added (as a fourth argument or a separate export) is the implementer's call — record the chosen shape and why the other was rejected on the issue, as the ticket asks.

## Done when these pass

- [ ] **sums the usage of every provider call in a turn that ran two tool rounds, not the last round alone** — a two-round turn whose rounds report {100, 20, 120} and {30, 50, 80} hands the hook {130, 70, 200}
  `src/orchestration/usageReporting.acceptance.test.ts`
- [ ] **still counts the rounds that reported usage when one reports none, and reports nothing when no round did** — usage {10, 5, 15}, silence, then {4, 1, 5} sums to {14, 6, 20} rather than collapsing to the last reporting round; a turn where no round reported hands the hook `undefined`, not a zeroed or NaN total
  `src/orchestration/usageReporting.acceptance.test.ts`

Run them, and only them, with:

```
node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/usageReporting.acceptance.test.ts
```

## Facets

- [x] Replace the spec's recorded under-counting line with the new behaviour, cited to the red tests (`specs/hal-engine-config-hooks/spec.md`, § Usage reported to `afterModelResponse`) — done in this commit; the tests it cites are still red
- [ ] Accumulate usage across rounds in `chatOrchestrator.ts`: replace the `lastUsage = outcome.usage ?? lastUsage` overwrite with a sum of the rounds that reported, and pass that sum as the hook's third argument. Rounds that reported nothing contribute nothing; no `?? 0` fabrication that would turn a wholly-unreported turn into a zero total
- [ ] Make the type say "sum": the third argument must not stay a bare, ambiguous `UsageMetadata` — a distinct named type (or an equivalent signature statement) that a reader of `OrchestratorHooks` can see is a turn total. Type-level, so no runtime test can pin it; `npm run typecheck` and review hold it, and no `any` in the public API
- [ ] Leave `chatOrchestrator.test.ts` untouched: "receives collected response text and usage" must stay green as written, which pins that a no-tool turn reports exactly today's single-round usage
- [ ] Add the CHANGELOG `### Changed` entry under `## [Unreleased]`: what an existing `afterModelResponse` consumer records grows for tool-heavy turns, with the migration note the repo's changelog format asks for
- [ ] Record on the issue why the rejected shape was rejected (the tests leave the optional per-round breakdown open; only the summed third argument is pinned)

## Out of scope

- The audit entry or billing record itself — a consumer's concern, not the engine's
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape, which providers already populate and this issue only aggregates