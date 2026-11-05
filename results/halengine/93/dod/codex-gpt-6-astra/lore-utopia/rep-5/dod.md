# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator().processMessage` already exposes the real tool loop and hook. The ticket-requested scripted provider supplies known usage values; the real registry executes arithmetic tools, with no mocked orchestrator or patched dependencies.

## Done when these pass

- [ ] **reports the sum of every provider call across two tool rounds** — three distinct provider usages are summed fieldwise and reported once after two real tool executions.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **counts reported rounds when usage is missing and preserves absent usage** — missing first, middle, or last usage cannot discard other rounds; all-missing usage remains absent and a direct answer stays unchanged.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Sum all reported round usage without changing provider stop chunks or mutating provider usage values.
- [ ] Preserve undefined when no round reports usage; keep the existing `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts` unedited.
- [ ] Expose the sum through `totalUsage?: TurnUsageMetadata` with the existing numeric fields and no public `any`; the spec records why a breakdown was deferred.
- [ ] Add a consumer-facing changelog entry and MINOR version bump for the changed totals; keep the updated hook spec accurate.
- [ ] Let CI verify build, types, lint, formatting, and the full suite after implementation.

## Out of scope

- Billing or audit storage, external token accounting, and changes to provider stop-chunk usage.
- Non-Error rejection handling, the other unlinked measured semantic in the inherited hooks spec.
- A per-round public breakdown. The selected contract retains one argument with summed token fields.
- Source-text assertions for public names, release notes, or version changes; those are review obligations above.

The current Lore list adapter emits only `id`, `name`, and `file`, not `spec`. Test comments stamp the spec anchors and the spec links name both tests; adding descriptor extraction would change tooling outside this tests-only ticket.