# Definition of Done

> what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The `afterModelResponse` hook is already an established seam in `chatOrchestrator.ts`. The acceptance tests can install a hook, drive multiple rounds, and assert that the reported usage is the sum of all rounds.

## Done when these pass

- [x] **accumulates usage across multiple tool rounds** — A turn with tool rounds reports the sum of tokens from all provider calls.
  `src/orchestration/usage-accumulation.acceptance.test.ts`
- [x] **reports correct usage for a single round turn** — A turn with no tool calls still reports its usage correctly.
  `src/orchestration/usage-accumulation.acceptance.test.ts`
- [x] **ignores rounds with missing usage in the total** — If some rounds report usage and others don't, the total is the sum of reported ones.
  `src/orchestration/usage-accumulation.acceptance.test.ts`

## Facets

- [x] Implement usage accumulation in `chatOrchestrator.ts` loop.
- [x] Update `afterModelResponse` hook call to pass the accumulated usage.
- [x] Ensure types in `src/types/ai.ts` or `src/orchestration/chatOrchestrator.ts` support accumulation (no `any`).
- [x] Update `specs/hal-engine-config-hooks/spec.md` with new behavior.
- [x] Add CHANGELOG entry for the behavior change.

## Out of scope

- Token accounting for anything other than provider calls.
- Audit or billing implementation (consumer's responsibility).