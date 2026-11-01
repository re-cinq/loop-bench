# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` accepts a scripted provider, a real tool registry and an observing hook. Keep the existing usage argument as the sum; a per-round breakdown adds surface not needed for turn billing.

## Done when these pass

- [ ] **reports the sum of all three provider calls after two tool rounds** — one hook invocation reports all token fields across three provider calls and two executed tool rounds.
      `src/orchestration/chatOrchestrator-usage.acceptance.test.ts`
- [ ] **sums reported rounds despite missing usage and preserves wholly absent usage** — missing first, middle or final reports do not discard other rounds; all-absent usage stays undefined and direct answers retain their usage.
      `src/orchestration/chatOrchestrator-usage.acceptance.test.ts`

## Facets

- [ ] Accumulate every provider call's input, output and total tokens within each turn, preserving one afterModelResponse invocation.
- [ ] Ignore absent reports without producing NaN; retain undefined when nothing reports.
- [ ] Make the hook's public type/signature explicitly identify turn-total usage, with no any; retain the existing no-tool test `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` unedited.
- [ ] Ship the sum contract documented in the spec, a MINOR version bump and a CHANGELOG entry explaining the larger recorded usage for existing consumers; the breakdown alternative is rejected in the spec because it adds unnecessary public surface.
- [ ] Let CI run the build, full suite, typecheck, eslint and formatting gates.

## Out of scope

- Billing/audit storage, non-orchestrator provider calls, and changes to provider stop-chunk usage.
- The spec's unrelated non-Error rejection behaviour.
- New descriptor tooling: `.lore/test-commands.yml` uses `scripts/lore-list-tests.mjs`, whose descriptors expose only id/name/file, not spec. Tests carry spec-anchor comments and statements carry named validation links; exposing a spec field would require changing tooling outside this tests-only task.