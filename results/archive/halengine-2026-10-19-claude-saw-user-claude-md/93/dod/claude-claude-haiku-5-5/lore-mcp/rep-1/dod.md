# Definition of Done

> so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — the seam exists. `createChatOrchestrator` takes a scripted `AIProvider` and a real `ToolRegistry`, and `afterModelResponse` receives the usage argument on the public `processMessage` path, so both tests call the real entry point and fail on the value handed to the hook.

The red bar is CI's to show. The pod cannot run the CI job, so the failing output is not quoted here; it comes from the `Test` step of `.github/workflows/ci.yml`, which runs `npm test` (`node --experimental-vm-modules node_modules/jest/bin/jest.js`) over `src/**/*.test.ts`. Its selectors are listed by the `hal-engine-jest` entry in `.lore/test-commands.yml`.

## Done when these pass

- [ ] **returns the summed usage of three provider calls across two tool rounds** — a turn with two tool rounds reporting 100/20, 300/40 and 500/60 hands the hook 900/120/1020, not only the final round's 500/60
      `src/orchestration/usageAcrossRounds.acceptance.test.ts`
- [ ] **skips a round that reports no usage, and reports nothing when no round reports any** — a silent middle round is not counted and does not make the total `undefined` or `NaN` (100/20 + silent + 50/5 gives 150/25/175), and a turn where no round reports hands the hook `undefined`
      `src/orchestration/usageAcrossRounds.acceptance.test.ts`
- [ ] **receives collected response text and usage** — guard, passes today and must stay green unedited: a turn with no tool calls reports exactly the usage the provider reported
      `src/orchestration/chatOrchestrator.test.ts`
- [ ] **keeps the usage an earlier round reported when a later round reports none** — guard, passes today and must stay green unedited: one reporting round still reports its own usage under the sum
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [x] Shape chosen: one `usage` argument carrying the turn total, not a per-round breakdown. A per-round breakdown was rejected because no consumer asks for provider-call granularity, and it widens the public surface for a number a deployer can already get from the provider's own logs.
- [x] `lastUsage = outcome.usage ?? lastUsage` in `src/orchestration/chatOrchestrator.ts` replaced by a running sum over rounds that reported, left `undefined` when none did.
- [x] The `afterModelResponse` parameter in `OrchestratorHooks` renamed so the signature says it is a turn total, and its JSDoc or type comment says so in one line.
- [x] `specs/hal-engine-config-hooks/spec.md`: the under-counting statement is replaced with the summed behaviour and cites the first acceptance test.
- [x] `CHANGELOG.md`: entry states that an existing `afterModelResponse` consumer will record larger totals for turns that ran tools, and that the change is a MINOR bump.
- [x] Type-level: no `any` in the public API.

## Out of scope

- The audit entry or billing record itself, which is a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape, which providers already populate and this ticket only aggregates.
- The `onError` gate on `error instanceof Error` recorded in `specs/hal-engine-config-hooks/spec.md` (a separate measured-semantics line, not this ticket's subject).