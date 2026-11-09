# Definition of Done

> `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — the seam already exists and is the one the ticket names: `createChatOrchestrator` driven by a scripted provider whose rounds report known token counts, observed through the `afterModelResponse` hook. The tests go through `processMessage`, the real entry point, and fail today because the hook receives the last round's usage instead of the turn's. Run them with `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.usage.acceptance.test.ts` (a bare `npm test` is refused).

## Done when these pass

- [ ] **reports the sum of every provider call in a two-round turn, not the last round alone** — a scripted provider whose two rounds report {100,20,120} then {5,40,45} must hand the hook {105,60,165}; today it hands {5,40,45}, the last leg alone (RED, fails for the ticket's stated reason)
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **counts only the rounds that reported usage when a round between them reports none** — three rounds where the middle one reports nothing must hand the hook {15,10,25}; today it hands {5,6,11} (RED, the partial-reporting half of the ticket's no-undefined/NaN criterion)
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **reports nothing when no round in the turn reported usage** — green today; a guard pinning the other half of that criterion, so an accumulator that always emits `{0,0,0}` cannot sneak in
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **receives collected response text and usage** — EXISTING test, unedited, the ticket's no-tool-turn pin: a turn with no tool calls reports exactly what it reports today, so the common path does not move. Must stay green and untouched (acceptance criterion 2 names it explicitly)
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts`, accumulate across the round loop: sum each round's reported usage field-wise into the turn total and leave it `undefined` when no round reported. Replaces the `lastUsage = outcome.usage ?? lastUsage` carry-forward. Turns the two red tests green and keeps the guard green.
- [ ] Make the declaration say the answer (acceptance criterion 4): the `afterModelResponse` third parameter in `OrchestratorHooks` must read as a turn total — rename it (e.g. `totalUsage`) and carry a one-line doc comment saying it is the sum across the turn's provider calls. No behavioural test can pin a parameter name (TS assignability ignores names, and a scan of the source text is a prose guard, not an acceptance test), so this facet is judged by review, not by a red bar.
- [ ] Record on the issue or in the PR why the other shape was rejected — the ticket leaves the decision to the implementer (sum-only vs sum plus a per-round breakdown). The tests pin only the contract both shapes share: the hook's usage argument covers every provider call. Note that either shape keeps the two existing usage tests green unedited: a fourth, optional breakdown parameter or a rename both leave the third argument's value untouched.
- [ ] CHANGELOG: add an entry under `## [Unreleased]` → `### Changed` stating that `afterModelResponse` now receives the usage of every provider call in the turn rather than the last call alone, with the migration note an existing consumer needs (tool-heavy turns record larger numbers). `scripts/check-changelog.sh` fails any PR that changes `src/` without touching CHANGELOG.md. Worth a MINOR bump at release per the ticket.
- [x] `specs/hal-engine-config-hooks/spec.md`: the recorded under-counting line is replaced by a "Usage reported to afterModelResponse" section whose statements cite the tests above (done in this commit; the citations pass `spec:names`, `check:spec-links` and `check:spec-status`).

## Out of scope

- The audit entry or billing record itself — a consumer's concern; the `UsageStore` interface stays unwired.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape: providers already populate it per call, and the issue only aggregates it. A round refused by the tool budget still made a provider call, so accumulating inside the loop counts it; no separate test is owed.
- README / docs / example snippets that log `afterModelResponse`'s usage keep their shape; only the value they log grows for tool-heavy turns. The ticket requires no edit there.