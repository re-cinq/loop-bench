# Definition of Done

> so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The seam exists: `createChatOrchestrator` takes a scripted `AIProvider` and an `afterModelResponse` hook, as `toolBudget.test.ts` already drives. The tests call `processMessage` and read the usage argument the hook receives. The red bar is at the current `lastUsage` assignment in `src/orchestration/chatOrchestrator.ts`.

## Done when these pass

- [ ] **reports the usage of every provider call in a turn that ran two tool rounds** — three provider calls with known, different counts (100/20/120, 300/40/340, 500/60/560) must reach the hook as their sum, 900/120/1020. Red today: the hook receives 500/60/560.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **counts the rounds that reported and leaves the total undefined only when no round reported** — a round that reports nothing neither zeroes nor poisons the total: rounds reporting 100/20/120 and 500/60/560 with a silent round between sum to 600/80/680, and a turn where no round reports hands the hook `undefined`. Red today: the mixed turn receives 500/60/560; the silent turn already passes.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

- [ ] **receives collected response text and usage** — the existing no-tools regression guard: a single-round turn reports exactly its provider's usage. Passes today and must stay green, unedited.
      `src/orchestration/chatOrchestrator.test.ts`
- [ ] **keeps the usage an earlier round reported when a later round reports none** — existing test, passes today and must stay green, unedited.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [x] Red: the two acceptance tests fail on the `lastUsage = outcome.usage ?? lastUsage` assignment, as the ticket claims.
- [x] Green: accumulate usage per round in `chatOrchestrator.ts` (sum the rounds that report; `undefined` only when none did). Keep the third argument of `afterModelResponse` as the sum; the test pins that slot.
- [x] Green: a turn with no tool calls reports the same value as before (existing test above stays green).
- [x] Type: the hook's usage parameter says it is a sum, not the last round. This is a type-level property that the typecheck step covers, not a behavioural test here. Either rename the type or document it at the declaration in `OrchestratorHooks`.
- [x] Spec: `specs/hal-engine-config-hooks/spec.md` line 28 still records the last-round behaviour. Replace it with the summed behaviour and cite the acceptance test. It is not cited yet because the statement it would cite does not exist until the change lands.
- [x] CHANGELOG: an `Unreleased` entry that says what an existing consumer will record. Tool-heavy turns report larger numbers. This is a MINOR bump.
- [x] Spec link: `spec.md` line 27 (`catch` gates `onError` on `instanceof Error`) now carries a validated-by link to chatOrchestrator.test.ts#L311.
- [x] CI fix: spec-anchor line numbers in architecture and tool-input-validation spec.md were stale (shifted by inserted tests); repointed by check-spec-anchor-names --fix. spec-hooks spec.md line 33 (accumulateUsage intro) was an unlinked testable statement; added validated-by link ending in `.` so the trailing-paren parser recognises it. Test at chatOrchestrator.test.ts#L311 had 2 expects (max 1) and an unknown eslint-disable rule; combined expects into one toEqual and removed the stale disable comment.

## Out of scope

- The audit entry or billing record itself. That is a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape. Providers already populate it, and this ticket only aggregates it.
- The "pass both" shape (per-round breakdown beside the total). The tests do not pin it, so an implementer may add it, but it is not required.
- The `specs/hal-engine-config-hooks/spec.md` line 28 edit and the CHANGELOG line are doc work for the implementation round, not acceptance tests.