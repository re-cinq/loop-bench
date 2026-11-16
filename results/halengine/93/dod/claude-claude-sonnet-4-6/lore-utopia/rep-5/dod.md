# Definition of Done

> `afterModelResponse` is called once per user message after the round loop exits, and is passed the `lastUsage` local — the most recent round's usage, not a sum across tool rounds, so a deployer using the hook for billing or audit under-counts every turn that ran tools.

**Strategy: `direct`** — `afterModelResponse` is a live hook seam on `createChatOrchestrator`. A scripted provider whose rounds emit known, different token counts can drive two tool rounds and assert on the value the hook receives, failing today because the orchestrator passes `lastUsage` (last round only) rather than a sum.

## Done when these pass

- [ ] **sums usage across all rounds and passes the total to the hook for a two-round tool turn** — `afterModelResponse` receives `{inputTokens: 300, outputTokens: 30, totalTokens: 330}` when round 1 reports `{100, 10, 110}` and round 2 reports `{200, 20, 220}`; currently fails because the hook gets round 2's figures alone.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Change `lastUsage = outcome.usage ?? lastUsage` in `chatOrchestrator.ts` to accumulate: sum `inputTokens`, `outputTokens`, `totalTokens` across rounds, treating a round that reports no usage as contributing zero (not NaN).
- [ ] Decide whether the hook signature stays `usage?: UsageMetadata` (sum only) or is widened to include a per-round breakdown; record the rejected option as a comment or ADR entry.
- [ ] Update the "Measured semantics" bullet in `specs/hal-engine-config-hooks/spec.md` to reflect the new behaviour; replace the under-counting note with the new guarantee.
- [ ] Add a CHANGELOG entry under the next MINOR version noting that `afterModelResponse` now receives the full-turn total, so an existing consumer will see larger numbers on tool-heavy turns.
- [ ] Confirm the existing `afterModelResponse receives collected response text and usage` test in `chatOrchestrator.test.ts` still passes (no-tools turn must report exactly what it reported before).

## Out of scope

- Audit entries, billing records, or any consumer of the usage value — those are deployer concerns.
- Token accounting for anything other than the provider calls the orchestrator itself makes.
- The shape of the `stop` chunk's own `usage` field, which providers already populate.
- Per-round breakdown exposure (acceptable as a future extension; this ticket requires at minimum the sum).