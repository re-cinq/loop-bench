# Definition of Done

> `afterModelResponse` ... is handed the `lastUsage` local ... so what the hook receives is the usage of the final provider call alone. [...] A deployer billing or budgeting from this hook under-counts exactly the expensive turns

**Strategy: `direct`** — `createChatOrchestrator` with a scripted provider and an `afterModelResponse` hook is a real entry point today; the tests fail on the reported number, not on a missing seam.

## Done when these pass

- [ ] **reports the sum of every provider call in a turn that ran two tool rounds** — three scripted rounds with different known counts; the hook's usage argument is their sum.
  `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **counts the rounds that reported when others did not, and reports nothing when no round did** — a round without usage neither voids nor NaNs the total; an all-silent turn still passes `undefined`.
  `src/orchestration/turnUsage.acceptance.test.ts`

## Facets

- [ ] Accumulate usage across rounds in `chatOrchestrator.ts`, skipping rounds that report none.
- [ ] Make the hook type say it is a turn total (and record why the per-round alternative was rejected, or pass both).
- [ ] Replace the under-counting line in `specs/hal-engine-config-hooks/spec.md` (line 28), link it to these tests, and add the CHANGELOG entry.
- [ ] Existing no-tools tests stay unedited and green.

## Out of scope

- Audit or billing records; accounting for anything other than orchestrator provider calls; the `stop` chunk's `usage` shape.
- Tests assume the total is the hook's third argument; if both total and breakdown are passed, the total must stay third.
- Spec statement left unlinked: it still records the old behaviour and must be rewritten by the implementing round.