# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` already accepts a provider and real tool registry and exposes the completed turn through `afterModelResponse`. The ticket explicitly calls for a scripted provider; the acceptance test feeds real protocol chunks through that interface and executes registered tools without mocking the orchestrator.

## Done when these pass

- [ ] **reports the sum of every provider call per turn, counting only rounds that report usage** — Three distinct provider usages across two tool rounds are summed field by field; missing first, middle, or final usage does not lose reported counts; entirely missing usage stays undefined; totals reset between turns and a direct response retains its usage. Also verifies two tools execute and the hook fires once per turn.
      `src/orchestration/usage.acceptance.test.ts`

## Facets

- [ ] Accumulate reported usage locally per user turn, preserving undefined until a provider reports usage and summing all three token fields.
- [ ] Preserve missing-usage semantics and the unedited existing `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts`.
- [ ] Name the hook's typed argument `totalUsage` (no public `any`); keep the single UsageMetadata argument. The spec records why per-round breakdown was rejected.
- [ ] Add the MINOR version bump and changelog entry explaining that existing consumers now record the whole turn, including earlier tool rounds.
- [ ] Keep the revised spec contract accurate and pass the repository's required CI checks.

## Out of scope

- Audit or billing storage, accounting outside orchestrator provider calls, and changes to stop chunks.
- The unrelated recorded non-Error rejection behaviour in this spec.
- Per-round breakdown in the public hook API.
- Test-descriptor tooling changes: the current Lore list command emits only id, name, and file; the test carries an @spec anchor and the spec links its declaration, but exposing a descriptor spec field requires separate tooling work.