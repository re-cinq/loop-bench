# Definition of Done

> `afterModelResponse` is called once per user message after the round loop exits, and is passed the `lastUsage` local — the most recent round's usage, not a sum across tool rounds, so a deployer using the hook for billing or audit under-counts every turn that ran tools.

**Strategy: `direct`** — `createChatOrchestrator` already accepts hooks and can be driven with a scripted provider whose rounds emit known, different token counts. The `afterModelResponse` hook receives `lastUsage`, which holds only the most recent round's value; the test fails because the sum is not yet computed.

## Done when these pass

- [ ] **accumulates usage across all tool rounds instead of reporting only the last round** — `afterModelResponse` receives `{inputTokens:30, outputTokens:13, totalTokens:43}` for a two-tool-round turn where round 1 reports `{10,5,15}` and round 2 reports `{20,8,28}`; currently fails with the last round's value `{20,8,28}`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] In `processMessageStream`, replace `lastUsage = outcome.usage ?? lastUsage` with an accumulator that sums `inputTokens`, `outputTokens`, and `totalTokens` across every round that reports usage, leaving the total `undefined` when no round reported
- [ ] Pass the accumulated total to `afterModelResponse` in place of `lastUsage`
- [ ] Update `specs/hal-engine-config-hooks/spec.md`: remove the "Measured semantics — out of scope" bullet recording the under-counting and ensure the new spec statement added by this DoD remains the live description
- [ ] Add a CHANGELOG entry under the next MINOR version noting that existing consumers of `afterModelResponse` will now receive a sum across all tool rounds, not the final round's value alone

## Out of scope

- Audit entry or billing record implementation (consumer's concern)
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape (providers already populate it)
- Changing the parameter type or name on `afterModelResponse` to make the sum semantics visible in the signature — that is a separate API-surface decision the ticket leaves open