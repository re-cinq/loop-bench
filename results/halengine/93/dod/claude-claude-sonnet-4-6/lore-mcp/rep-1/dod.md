# Definition of Done

> `afterModelResponse` is called once per user message after the round loop exits, and is passed the `lastUsage` local — the most recent round's usage, not a sum across tool rounds, so a deployer using the hook for billing or audit under-counts every turn that ran tools.

**Strategy: `direct`** — `createChatOrchestrator` is callable with a scripted provider and tool registry that drive the full tool loop. The hook's argument is observable in a test, so the acceptance tests call the real entry point and assert on what `afterModelResponse` receives.

## Done when these pass

- [ ] **reports summed usage across all provider rounds to afterModelResponse** — a turn that runs one tool round then finishes passes the sum of both rounds' usage to `afterModelResponse`, not only the final round's
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **counts only rounds that reported usage, skipping rounds that did not** — a turn with three provider calls where the middle one reports no usage passes the sum of the first and third rounds only
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Replace `lastUsage = outcome.usage ?? lastUsage` in `chatOrchestrator.ts` with an accumulator that sums `inputTokens`, `outputTokens`, and `totalTokens` across rounds, treating a round with no usage as zero contribution
- [ ] Decide the hook signature shape (sum only, or sum plus breakdown) and update the `afterModelResponse` type in `OrchestratorHooks` so the type communicates the answer without opening the orchestrator
- [ ] Replace the under-counting statement in `specs/hal-engine-config-hooks/spec.md` "Measured semantics — out of scope" section with one describing the new accumulated behaviour, and add the validated-by parenthetical pointing to the acceptance tests
- [ ] Add a CHANGELOG entry under the next MINOR version noting the behaviour change: existing consumers of `afterModelResponse` will now receive a larger usage figure on tool-heavy turns

## Out of scope

- Audit entry or billing record implementation (consumer concern)
- Token accounting for anything outside the orchestrator's own provider calls
- The shape of the `usage` field inside the `stop` chunk that providers emit