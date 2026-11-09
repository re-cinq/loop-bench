# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` already exposes the real tool loop and `afterModelResponse` hook. A concrete scripted provider supplies protocol chunks with known counts as requested by the ticket, while the real prompt builder, registry, numeric tool executor and orchestrator run without mocked methods or modules.

## Done when these pass

- [ ] **reports the sum of every provider call after two tool rounds** — one hook report sums all three provider calls, after both real tool executions.
      `src/orchestration/usage.acceptance.test.ts`
- [ ] **counts reported rounds when usage is missing and preserves an entirely unreported turn** — missing first, middle or last reports retain the other rounds' sum; entirely absent usage stays absent and a direct answer stays unchanged.
      `src/orchestration/usage.acceptance.test.ts`

## Facets

- [ ] Accumulate all three token fields within each turn and pass the sum once to the hook.
- [ ] Ignore missing usage without losing earlier totals; preserve undefined when nothing reported and preserve the no-tool path. Keep `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` unedited and green in CI.
- [ ] Make the public hook signature explicitly identify total turn usage without `any`; keep the single usage argument. The spec records why a per-round breakdown was rejected.
- [ ] Add the MINOR version bump and consumer-facing CHANGELOG entry explaining that tool-heavy turns now report larger, complete totals; retain the updated spec semantics.
- [ ] Keep the existing build, tests, typecheck, ESLint and formatting gates green in CI after implementation.

## Out of scope

- Billing or audit persistence, calls made outside the orchestrator, and changing provider stop-chunk usage.
- Non-Error rejection handling, which is an unrelated unlinked statement in the original spec.
- Test discovery tooling changes: the current `.lore/test-commands.yml` list script emits only id/name/file, not a spec field. Tests carry spec stamps and the spec carries named validation links; exposing those stamps in descriptors requires a separate tooling change.