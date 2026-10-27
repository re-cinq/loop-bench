# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` accepts a real provider, tool registry, and lifecycle hook, so acceptance tests can drive multiple provider rounds without mocks or source-text assertions.

## Done when these pass

- [ ] **reports the sum of usage from every provider call in a tool turn** — a two-round tool turn passes the hook one unambiguous `UsageMetadata` total covering both provider calls.
      `src/orchestration/usageAggregation.acceptance.test.ts`
- [ ] **counts reported rounds while leaving an all-unreported turn without usage** — missing round usage is ignored rather than producing `undefined` or `NaN`, while a turn with no reported usage remains without usage.
      `src/orchestration/usageAggregation.acceptance.test.ts`
- [ ] **receives collected response text and usage** — the existing no-tool hook test remains unchanged and proves the common path continues to report today’s usage.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Aggregate usage fields across every provider round while preserving `undefined` when no round reports usage.
- [ ] Keep the public hook argument a clearly defined summed `UsageMetadata` value and update the spec and changelog.
- [ ] Re-run the acceptance tests after implementation; the no-tool existing test must remain green and unedited.

## Out of scope

- Audit entries, billing records, and budgeting consumers.
- Accounting for non-provider activity or changing the provider stop-chunk usage shape.