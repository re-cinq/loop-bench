# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `afterModelResponse` is already the seam: a scripted provider plus a real `ToolRegistry` drives `createChatOrchestrator` through two tool rounds and the hook records what it is handed. Decision taken: sum every round into the single `usage` argument (still `UsageMetadata`); the per-round breakdown was rejected as a wider public surface no consumer has asked for, and the sum is what billing and budgets need.

## Done when these pass

- [ ] **reports 5300 input, 285 output and 5585 total tokens for a turn whose three provider calls reported 1240, 1835 and 2510** — a turn driven through two tool rounds hands the hook the sum of all three provider calls
  `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **counts the 1240 and 2510 rounds that reported when the middle round reports none, and reports nothing when no round did** — a round without usage neither drops the others nor yields `NaN`, and a turn with no reported usage still passes `undefined`
  `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **receives collected response text and usage** (existing, must stay green and unedited) — a no-tool turn reports exactly what it reports today
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [x] Accumulate usage across rounds in `chatOrchestrator.ts` (a pure `addUsage(total, round)` that keeps `undefined` until a round reports) in place of `lastUsage = outcome.usage ?? lastUsage`
- [x] Make the hook's type say it is a sum: a one-line JSDoc on `afterModelResponse` (or a `TurnUsage` alias of `UsageMetadata` exported from `src/types/ai.ts`), then regenerate the OrchestratorHooks block in CLAUDE.md
- [x] Delete the under-counting bullet from "Measured semantics" in `specs/hal-engine-config-hooks/spec.md` (and its lead-in count of "these two properties")
- [x] CHANGELOG entry under a MINOR bump stating that `afterModelResponse` now receives the turn's summed usage, so tool-calling turns record larger numbers than before
- [x] Export `scriptedProvider` from `chatOrchestrator.ts` so the acceptance test can import it (was missing — CI failed typecheck and test)

## Out of scope

- The audit entry or billing record itself
- Token accounting for anything other than the orchestrator's provider calls (e.g. `generateStructured`)
- The `stop` chunk's own `usage` shape
- A per-round usage breakdown on the hook