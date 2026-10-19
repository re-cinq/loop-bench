# Definition of Done

> what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` accepts a scripted provider, a real tool registry, and `afterModelResponse`, so the hook's reported usage can be asserted through `processMessage` today. Use a summed turn total in the existing `usage` argument; a round breakdown would widen the public API beyond the billing total this issue asks for.

## Done when these pass

- [ ] **reports turn usage across every provider call, ignoring missing rounds** — two tool rounds and a final provider call report summed token counts; missing usage is omitted, and no reported usage stays `undefined`.
      `src/orchestration/turnUsage.acceptance.test.ts`

## Facets

- [x] Accumulate `inputTokens`, `outputTokens`, and `totalTokens` from each provider call with reported usage, and pass `undefined` only when none report.
- [ ] Name the hook's usage type as a turn total in the public signature without `any`; keep the same `UsageMetadata` fields for existing consumers.
- [ ] Update the spec's measured semantics to the implemented total and add a changelog entry explaining that tool turns now report larger, complete usage totals; include the MINOR version change. (Changelog entry added; MINOR version bump in `package.json` still needed.)
- [ ] Keep the existing direct-answer test `receives collected response text and usage` unedited and green in CI, then pass the repository's remaining CI gates. (ESLint/spec-names/changelog fixed; full CI pass pending.)

## Out of scope

- Consumer billing records, accounting outside the orchestrator's provider calls, and the provider's stop-chunk usage shape.