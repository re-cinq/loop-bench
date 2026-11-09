# Definition of Done

> It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` takes any `AIProvider`, so the acceptance tests script one whose rounds report known, different token counts, drive `processMessage`, and read what the `afterModelResponse` hook received. No new module and no characterization pass is needed — both tests fail today on exactly the under-counting the ticket reports.

## Done when these pass

- [ ] **reports usage summed across every provider call of a tool-driven turn, with the per-round breakdown** — a turn driven through two tool rounds (three provider calls reporting 100/10/110, 200/20/220 and 300/30/330 tokens) hands the hook the sum 600/60/660 plus the per-round breakdown, not the final call's usage alone. Red today: the hook receives 300/30/330 and no breakdown.
  `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [ ] **counts only the rounds that reported usage, and reports nothing when no round reported** — a turn whose third round reports no usage sums the two that did (31/7/38, never `undefined` or `NaN`) and keeps `undefined` in the third breakdown slot; a turn where nothing reported still reports nothing (`undefined` usage, one `undefined` slot). Red today.
  `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [ ] **receives collected response text and usage** — EXISTING test, must stay green and UNEDITED: a turn with no tool calls makes one provider call, so the sum is that call's usage exactly as the hook reports it today.
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Make the third `afterModelResponse` argument the sum across the rounds that reported one, and add a fourth, `(UsageMetadata | undefined)[]`, one entry per provider call in turn order, `undefined` where that call reported none. Keep `UsageMetadata` as the third argument's type: wrapping the turn's usage in a new object type would move what a no-tool turn reports, and the existing pinning test could then not stay unedited. The pair of arguments is what makes the signature say "sum" without opening the orchestrator. No `any`.
- [ ] Existing test `keeps the usage an earlier round reported when a later round reports none` (`src/orchestration/chatOrchestrator.test.ts`#L527) needs no edit: its scenario has one reporting round, so the sum and the old carry-forward agree, and it stays green.
- [x] `specs/hal-engine-config-hooks/spec.md`: the recorded under-counting line is replaced by the new behaviour, cited from both acceptance tests and the existing no-tool test. Done by this pod alongside the tests.
- [x] `CHANGELOG.md`: the `Changed` entry under `[Unreleased]` states the change in what an existing consumer records, with a migration note. Done by this pod. The MINOR bump itself happens at release, like every other `[Unreleased]` entry.
- [ ] Red → green: run `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestratorUsage.acceptance.test.ts src/orchestration/chatOrchestrator.test.ts` until the two acceptance tests pass and the existing orchestrator suite stays green. The spec's `chatOrchestrator.ts#L148` source anchor will move when the orchestrator is edited: run `node scripts/repoint-spec-anchors.mjs` after the formatter.

## Out of scope

- The audit entry or billing record itself — a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape — providers already populate it; this issue only aggregates.
- `specs/hal-engine-architecture/spec.md`: its `afterModelResponse` statements (the collected response text and the usage; usage an earlier round reported is kept when a later round reports none) remain true under the new semantics, and their tests stay green unedited.
- Budget-exhausted and error paths: the hook still fires once per user message with the turn's total, no separate accounting for the synthetic stop, and an errored turn still fires no `afterModelResponse` at all.