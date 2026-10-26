# Definition of Done

> Report usage across every tool round, not just the last

**Strategy: `direct`** — `createChatOrchestrator` already exposes the real `afterModelResponse` hook and accepts a real scripted provider plus tool registry, so the acceptance tests exercise the complete tool-round path without mocks or a new seam.

## Done when these pass

- [ ] **reports the sum of usage from every provider call in a two-round tool turn** — the hook receives one unambiguous `UsageMetadata` total covering both provider calls.
      `src/orchestration/usageAcrossToolRounds.acceptance.test.ts`
- [ ] **counts usage-bearing rounds without producing NaN and reports nothing when all rounds omit usage** — reported rounds remain counted, while a turn with no reported usage remains `undefined`.
      `src/orchestration/usageAcrossToolRounds.acceptance.test.ts`

## Facets

- [ ] Make `afterModelResponse` aggregate input, output, and total tokens across all provider rounds while preserving the no-tool result.
- [ ] Define the public hook type and changelog entry so the aggregate semantics are explicit and the existing consumer behavior change is called out.
- [ ] Replace the measured-semantics note in the hooks spec with the aggregate behavior and keep the existing no-tool test unchanged.

## Out of scope

- Audit entries, billing records, or any consumer-side usage policy.
- Token accounting for anything other than provider calls made by the orchestrator.
- The `stop` chunk's existing `usage` shape.