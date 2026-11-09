# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` already exposes the real round loop and hook. The ticket explicitly calls for a scripted provider; the tests feed real chunks through that interface and execute a real registered tool, with no mocked orchestrator or accounting functions.

## Done when these pass

- [ ] **reports the sum of all three provider calls across two tool rounds** — one hook invocation receives all three token sums after two tools execute.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [ ] **sums reported rounds despite missing usage and reports nothing when every round omits it** — covers all seven missing-usage combinations and resets accounting between turns on the same orchestrator.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

## Facets

- [ ] Sum each reported provider-call usage within the turn and preserve `undefined` when nothing reported; make both acceptance tests green.
- [ ] Make the public hook signature explicitly identify turn-total usage without `any`; retain the existing no-tool test `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` unedited.
- [ ] Keep the summed-argument decision in the spec, record why the breakdown was deferred in the issue, and add the consumer-facing changelog entry and MINOR bump.
- [ ] Pass the repository CI checks. Test prose and public naming are review obligations, not source-text assertions.

## Out of scope

- Audit or billing persistence, usage outside orchestrator provider calls, per-round breakdown, changes to provider stop chunks, and the unrelated non-Error rejection behavior.
- Test-discovery tooling changes: `.lore/test-commands.yml` calls `scripts/lore-list-tests.mjs`, whose descriptors currently only emit `id`, `name`, and `file`; it has no spec-stamp support. Tests carry `@spec` anchors and the spec has explicit validating links; exposing a `spec` descriptor field requires a separate tooling change.