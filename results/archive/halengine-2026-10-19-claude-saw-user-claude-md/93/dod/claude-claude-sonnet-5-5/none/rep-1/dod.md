# Definition of Done

> `afterModelResponse` ... is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` with a scripted provider and a registered tool is a real seam; `afterModelResponse` receives its usage argument today, so the test fails on the value.

## Done when these pass

- [ ] **reports 600 input and 35 output tokens summed over three provider calls of a two-tool-round turn** — the usage argument of `afterModelResponse` is the sum over every provider call of the turn. Red today: receives only the last call (300/5/305).
  `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **counts the rounds that reported when the middle tool round reports no usage** — a round without usage neither voids nor NaNs the sum. Red today: last call only.
  `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **reports no usage when no round of a tool turn reported any** — guard: already green, must stay green once summing lands (no `0` or `NaN` invented).
  `src/orchestration/turnUsage.acceptance.test.ts`

## Facets

- [x] Accumulate usage across rounds in the orchestrator, skipping rounds that report none; first two tests go green.
- [x] Make the hook's type say it is a turn total (and optionally add a per-round breakdown as a further argument); the tests assume the third argument stays the total.
- [x] Replace the under-counting line in `specs/hal-engine-config-hooks/spec.md` (L28) with the new behaviour, link these tests, and add the CHANGELOG entry.
- [x] Existing no-tool test in `chatOrchestrator.test.ts` stays unedited and green.

## Out of scope

- The audit or billing record itself, accounting for anything but orchestrator provider calls, and the `stop` chunk's own `usage` shape.
- Type-level clarity and the CHANGELOG/spec edits are not executable behaviour; they are facets for review, not acceptance tests.