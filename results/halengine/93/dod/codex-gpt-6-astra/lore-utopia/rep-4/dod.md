# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` accepts an AIProvider and real ToolRegistry. A finite scripted provider emits known usage values through that boundary, as requested by the ticket; no orchestrator methods or dependencies are mocked.

## Done when these pass

- [ ] **reports the sum of every provider call after two tool rounds** — exactly one hook report includes all three calls and both real tool executions finish.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **sums reported rounds despite missing usage and preserves an entirely unreported turn** — missing first, middle, or last usage cannot erase earlier counts; no reports remain undefined.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Sum all three usage fields across provider rounds, scoped to the current user turn.
- [ ] Ignore absent usage without manufacturing zero usage for an entirely unreported turn.
- [ ] Keep the existing `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts` unedited and green.
- [ ] Give the hook's usage parameter an explicit aggregate type without public `any`; keep the existing fields. The spec records why the per-round breakdown alternative was rejected.
- [ ] Add the consumer-facing CHANGELOG entry explaining larger tool-turn counts and a MINOR version bump.
- [ ] Pass the repository's CI build, tests, typecheck, ESLint and Prettier gates.

## Out of scope

- Billing/audit storage, non-provider accounting, stop-chunk usage changes, and non-Error rejection handling.
- Source-text assertions about type names, changelog prose, or versions; these remain review obligations.
- Changing Lore descriptor tooling: the current list command emits only id/name/file and does not expose a spec field. Tests carry spec-anchor comments and the spec carries named validation links.