# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` accepts an `AIProvider`, real tool registry and lifecycle hooks. Feed it the scripted provider rounds explicitly requested by #93, execute real square tools, and observe the usage delivered to the hook without replacing or spying on any production module.

## Done when these pass

- [ ] **reports the sum of every provider call after two tool rounds** — one hook invocation carries all three provider calls' input, output and total token counts.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **sums reported rounds when usage is missing and preserves absent usage when none report** — missing first, middle or last usage does not discard earlier counts; no reports remain undefined and a zero report remains zero.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Accumulate all three usage fields across provider calls and deliver the sum once through the existing hook argument.
- [ ] Ignore missing round usage while preserving undefined for an entirely unreported turn and preserving reported zero counts.
- [ ] Keep `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` unedited; CI must retain its no-tool regression coverage.
- [ ] Make the public hook parameter/type unambiguously describe total turn usage, without `any`; retain the single argument shape selected in the spec, rather than widening the API with a breakdown.
- [ ] Deliver a MINOR version bump and consumer-facing CHANGELOG entry explaining that tool-heavy turns now report larger totals; retain the updated spec contract.
- [ ] CI verifies build, tests, typecheck, zero-warning lint and formatting. The current Lore list adapter emits only id/name/file, not a spec field; tests carry explicit @spec anchors and the spec carries named validation links, but descriptor enrichment is not exposed by this adapter.

## Out of scope

- Billing/audit persistence, accounting outside orchestrator provider calls, and changing provider stop-chunk usage.
- The spec's separate non-Error rejection behaviour and adding per-round breakdown to the public hook.
- Production implementation in this acceptance-test commit; API and release-document obligations are reviewed through their implementation diff and CI, not source-text assertion tests.