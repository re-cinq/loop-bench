# Definition of Done

> `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — the seam exists: `createChatOrchestrator` driven by a scripted provider whose rounds report known token counts, with an `afterModelResponse` hook that records what it is handed. The tests call the real entry point and fail on the under-count today; no new module and no characterization pass is needed.

Shape decided (the ticket asks for a decision and a recorded rejection): ticket option A — accumulate across rounds and keep one `usage` argument, handed as a named `TurnUsageMetadata` so the type itself says it is a turn total rather than one call's. Option B (total plus per-round breakdown parameter) is rejected: nothing in this repo or the epic consumes provider-call granularity, and a fourth parameter can be added later without breaking anyone, while the sum's behaviour change is what the CHANGELOG line is owed for. A turn whose only reporter is its single provider call hands that call's usage object through unchanged, so the no-tool path does not move at all.

## Done when these pass

- [ ] **hands afterModelResponse the usage of every provider call in a two-round turn** — a turn driven through two tool rounds, whose rounds report {100,20,120} then {40,60,100}, hands the hook {140,80,220}. RED now: the hook receives the last round's {40,60,100}, which is exactly the ticket's claim.
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **counts only the rounds that reported usage when a middle round reports none** — rounds reporting {10,4,14}, nothing, {30,6,36} hand the hook {40,10,50}: a silent round neither zeroes the total nor makes it `undefined` or `NaN`. RED now: the hook receives {30,6,36}.
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **hands afterModelResponse no usage when no round of the turn reported one** — a turn where nothing reported still reports nothing. GREEN today by design: this is the half of the contract that must not move, and a red version of it would contradict the ticket.
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

The ticket's second criterion pins the no-tool turn on an EXISTING test staying green and unedited — `receives collected response text and usage`, and with it `keeps the usage an earlier round reported when a later round reports none` (a non-reporting round must not overwrite an earlier round's usage). Neither file is listed under "Done when these pass" so this pod's harness keeps access to it:

```
NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/chatOrchestrator.test.ts -t "receives collected response text and usage"
NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/chatOrchestrator.test.ts -t "keeps the usage an earlier round reported when a later round reports none"
```

Both pass today. Note on runners: `scripts/lore-run-test.mjs` always exits 1 in this repository, because it adds `--coverage` and the coverage ratchet in `jest.config.js` then compares one file's run against whole-tree floors; the selected test's own result is still printed above that noise. Run acceptance tests directly with the jest form shown here instead.

## Facets

- [ ] Add `TurnUsageMetadata` beside `UsageMetadata` in `src/types/ai.ts`: a type alias of `UsageMetadata` whose one-line doc states it is one turn's usage, summed field-wise across the provider calls that reported. Annotate `OrchestratorHooks.afterModelResponse`'s third parameter with it and export it from `src/index.ts`. No extra members: the single-provider-call passthrough must stay structurally equal to the provider's own object, which the unedited existing pin asserts with `toEqual`. (Ticket criterion 4. A type name is invisible at runtime, so no test can hold this line — review does; the spec's sum statement names `TurnUsageMetadata`.)
- [ ] In `src/orchestration/chatOrchestrator.ts`, replace the `lastUsage` local with turn accumulation: exactly one reporting round hands that round's usage object through unchanged; several reporting rounds hand the field-wise sum; none hands `undefined`. This turns the first two acceptance tests green and leaves the third and both existing guards untouched.
- [ ] CHANGELOG: under `## [Unreleased]` → `### Changed`, one bullet written for somebody installing the package — `afterModelResponse` now reports usage summed across every provider call of a turn, so numbers recorded from it grow on tool-heavy turns — with a migration note, and naming that the per-round breakdown shape was weighed and rejected. MINOR bump at release, per the repo's behaviour-change policy.
- [ ] The spec statements and their `([validated by ...])` citations are already in place on this branch (`specs/hal-engine-config-hooks/spec.md`, "Measured semantics"); leave the citations pointing at the acceptance tests' `it(` lines if the test file moves.
- [ ] Only these are yours to keep green: the three acceptance tests above, plus the two existing guard tests (unedited). `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint` (`--max-warnings 0`) and `npm run prettier:check` are ticket criterion 6 and are CI's Verify job to judge — they are not run in the DoD pod.

## Out of scope

- The audit entry or billing record itself — a consumer's concern (ticket tech notes).
- Token accounting for anything other than the provider calls the orchestrator makes (ticket tech notes).
- The `stop` chunk's own `usage` shape — providers already populate it; this issue only aggregates it.
- A per-round breakdown parameter (ticket option B) — rejected above; adding it later is additive and non-breaking.
- Usage handed to the hook on a turn the tool budget closed (`onToolBudgetExhausted` path) — no criterion names it.
- The spec's `| Status |` row and the `Issue` field — untouched.