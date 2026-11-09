# Definition of Done

> It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` is the real entry point and the suite already drives it with a scripted multi-round provider and recording hooks. The acceptance test calls it today and fails on the under-counted value the ticket reports. Shape chosen: accumulate across rounds and pass the sum, keeping one `usage` argument — the ticket's own criterion 2 ("pinned by the existing test remaining unedited") selects it, since that existing test asserts a bare `UsageMetadata`.

## Done when these pass

- [ ] **reports usage summed across every provider call of a two-round turn** — RED today: the hook receives the last round's `{inputTokens: 50, outputTokens: 10, totalTokens: 60}` instead of the summed `{150, 30, 180}`; rounds report known, different token counts so no last-round or first-round-only bug can pass
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **counts the rounds that reported when a middle round reports none** — RED today for the same last-round value; also fails under a naive sum that turns a missing report into `undefined`/`NaN`, pinning criterion 3's first half
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **reports nothing when no round reported usage** — guard, already green today (a turn where nothing reported reports `undefined`); it pins criterion 3's second half and must stay green through the change
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **receives collected response text and usage** — EXISTING test, must stay unedited and green: a no-tool turn reports exactly what it reports today (criterion 2)
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Accumulate the reported rounds' usage in `src/orchestration/chatOrchestrator.ts` (`lastUsage = outcome.usage ?? lastUsage` becomes a field-wise sum over the rounds that reported), keeping the single `usage?: UsageMetadata` argument — turns the two red tests green without moving the guard or the existing pins
- [ ] Make the signature say the answer: the `afterModelResponse` member states, in its one-line JSDoc and parameter naming, that the value is the turn's total across every provider call — a reader of `OrchestratorHooks` learns it without opening the orchestrator; no `any` in the public API
- [ ] `specs/hal-engine-config-hooks/spec.md` states the new behaviour under "Usage reported to afterModelResponse" (written by this pod with citations; re-run `npm run spec:names:fix` if edits above the anchors move them)
- [ ] `CHANGELOG.md` gains a `### Changed` entry under `## [Unreleased]` stating the change in what an existing consumer records, with a migration note; MINOR bump per the behaviour change
- [ ] Existing pins stay green and unedited: `chatOrchestrator.test.ts` 'receives collected response text and usage' and 'keeps the usage an earlier round reported when a later round reports none' (the latter still holds under the sum: only one round reported)
- [ ] CI's verify suite green on the branch: `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint` (`--max-warnings 0`), `npm run prettier:check`

## Out of scope

- The audit entry or billing record itself — a consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape — providers already populate it; this ticket only aggregates
- The per-round breakdown shape (pass both total and rounds) — rejected: it changes the hook's published parameter type and moves the no-tool path that criterion 2 pins to the unedited existing test; a consumer wanting provider-call granularity is not served by this ticket
- The `catch` gating `onError` on `error instanceof Error` — still measured semantics under "Measured semantics — out of scope"