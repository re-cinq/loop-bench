# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` with a scripted provider and an `afterModelResponse` hook is a real seam today; the tests fail on the value the hook receives.

## Done when these pass

- [ ] **hands the hook the sum of three provider calls reporting 10+2, 20+5 and 40+7 tokens** — a turn with two tool rounds reports usage covering every provider call.
  `src/orchestration/usageAcrossRounds.acceptance.test.ts`
- [ ] **sums only the rounds that reported when the middle round reports none** — a round without usage is skipped, not turned into `undefined` or `NaN`.
  `src/orchestration/usageAcrossRounds.acceptance.test.ts`

## Facets

- [x] Accumulate usage across rounds in `chatOrchestrator.ts` and pass the sum as the single `usage` argument (shape chosen: sum, so the existing no-tool and "keeps earlier usage" tests stay unedited).
- [x] Skipped rounds leave the total `undefined` only when no round reported (existing tests pin this; keep green).
- [x] Make the hook's parameter type/doc say it is a turn total; replace the under-counting line in `specs/hal-engine-config-hooks/spec.md` (Measured semantics) and add a MINOR CHANGELOG entry stating recorded numbers grow for tool turns; record why the per-round breakdown was rejected.

## Out of scope

- The audit or billing record itself, token accounting beyond the orchestrator's provider calls, and the `stop` chunk's own `usage` shape.
- Not testable behaviourally: the type-clarity, spec and CHANGELOG criteria are review items.