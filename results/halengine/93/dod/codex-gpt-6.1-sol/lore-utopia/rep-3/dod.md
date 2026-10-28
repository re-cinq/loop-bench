# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` accepts a provider and real tool registry, so a scripted provider can drive two executed tool rounds and expose the hook's reported usage. Choose the summed third argument to preserve the existing hook shape; a per-round breakdown adds public surface without being needed for turn billing.

## Done when these pass

- [ ] **reports summed usage for every provider call while preserving missing usage and direct turns** — three distinct provider usages are summed once; missing first, middle or last usage does not erase reported counts, all-missing stays undefined, and direct turns keep their value.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate all three token fields across provider calls, ignoring absent usage and preserving undefined when none reported.
- [ ] Keep the existing no-tool test `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` unedited and green.
- [ ] Make the hook signature unambiguous about summed turn usage, with no any in the public API.
- [ ] Keep the linked spec's summed semantics accurate; record why the wider per-round API was rejected in the issue.
- [ ] Apply a MINOR version bump and a CHANGELOG entry explaining that existing consumers record larger totals for tool turns.
- [ ] Pass the repository's build, tests, typecheck, zero-warning eslint and formatting checks in CI.

## Out of scope

- Audit or billing storage, token accounting outside orchestrator provider calls, and changes to provider stop-chunk usage shapes.
- The separate non-Error rejection behaviour recorded in the hooks spec.

The test's spec anchor is `specs/hal-engine-config-hooks/spec.md#9`. The current `.lore/test-commands.yml` list command emits only id, name and file; the trailing spec citation supplies traceability without changing test discovery tooling.