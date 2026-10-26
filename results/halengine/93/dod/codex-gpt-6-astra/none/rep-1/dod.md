# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` exposes the real tool loop and its installed hook. The ticket explicitly requests a scripted provider with known counts; protocol fixtures drive that seam with a real tool registry, without mocking the orchestrator or replacing its accounting.

## Done when these pass

- [ ] **reports the sum of every provider call after two tool rounds** — one hook call contains all three calls' token counts.
      `src/orchestration/usage.acceptance.test.ts`
- [ ] **sums reported rounds despite missing usage and preserves an entirely unreported turn** — missing first, middle or final usage does not discard other rounds; all absent stays absent.
      `src/orchestration/usage.acceptance.test.ts`

## Facets

- [ ] Sum all three token fields across provider calls, with fresh accounting for each user turn.
- [ ] Ignore absent usage, preserving undefined when no call reports it.
- [ ] Keep the existing unedited `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts` green in CI.
- [ ] Make the public hook signature explicitly identify total turn usage, without any; retain one usage argument as chosen in the spec rather than adding a per-round breakdown.
- [ ] Add the consumer-facing changelog entry and MINOR version bump explaining the larger totals for existing tool-heavy consumers; retain the new spec contract.
- [ ] Pass the repository's build, tests, typecheck, eslint and formatting gates in CI.

## Out of scope

- Billing/audit persistence, accounting outside orchestrator provider calls, and changes to provider stop chunks.
- The spec's unrelated non-Error rejection behaviour; it is not part of #93.
- Source-text assertions for signature prose, release notes or version bumps: these are review facets, not behavioural tests.
- Changing Lore's descriptor adapter: `.lore/test-commands.yml` currently exposes only id/name/file, with no spec metadata support. Tests carry explicit spec stamps and the spec carries named validation links.