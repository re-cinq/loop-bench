# Definition of Done

> "For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it."

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` takes any `AIProvider`, so an acceptance test drives a real orchestrator turn through a scripted provider and reads the third argument the real `afterModelResponse` hook is handed. No doubles: the scripted provider is a real `AIProvider`, the tool registry is the real `ToolRegistry`, and the hook is the production one.

## Done when these pass

- [ ] **reports the sum of every provider call in a turn that ran two tool rounds** — a turn driven through two tool rounds whose provider reports (10, 4, 14) then (100, 8, 108) hands `afterModelResponse` the per-field sum (110, 12, 122); today it hands the last round alone
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **counts the rounds that reported usage, and reports nothing when no round did** — a round whose provider reports no usage adds nothing (no `undefined`/`NaN` total: rounds 1 and 3 of a three-round turn sum to (37, 7, 44)), and a turn where no round reported still reports `undefined`
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **receives collected response text and usage** (EXISTING test, must remain unedited and green — the ticket pins the no-tool path to it) — a turn with no tool calls reports exactly the single provider call's usage
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [x] Spec statement replaced: `specs/hal-engine-config-hooks/spec.md`'s recorded under-counting line moved out of "Measured semantics — out of scope" into a cited "Usage reported to afterModelResponse" section (this commit)
- [x] Red acceptance tests committed (this commit)
- [ ] Sum the usage across the round loop in `src/orchestration/chatOrchestrator.ts` (`lastUsage` local): add every round's reported usage per field, skip rounds that report none, keep `undefined` when no round reported
- [ ] Make the type say it: type the third parameter of `OrchestratorHooks.afterModelResponse` as a semantically named exported type (e.g. `TurnUsage`, documented as the sum over every provider call of the turn) instead of bare `UsageMetadata`, and export it from `src/index.ts`; no `any`. It must stay `UsageMetadata`-shaped so the existing no-tool consumer and test read it unchanged
- [ ] CHANGELOG: a `### Changed` entry under `## [Unreleased]` stating that `afterModelResponse` now reports every provider call in the turn summed, so what an existing consumer records grows on tool turns; the behaviour change rides the pending MINOR (check-changelog gate fails the PR without it once `src/orchestration/chatOrchestrator.ts` changes)
- [ ] Regenerate the `OrchestratorHooks` doc block after the signature change (`npm run docs:fix`) — CLAUDE.md's block is generated from source and CI's "Documented code blocks" step diffs it
- [ ] CI's `Verify` job judges the rest of the ticket's checklist: `npm run typecheck`, `npm run eslint` (`--max-warnings 0`), `npm run prettier:check`, `npm run build`, and the full suite under `npm run test:coverage` ("Test (with coverage floor)" step)

Decision recorded, as the ticket asks: the summed total keeps ONE `usage` argument, typed so the signature says it is the turn total. The per-round-breakdown shape was rejected because no named consumer needs provider-call granularity, it widens the public hook surface, and the no-tool path must not move — the third argument has to stay a bare usage-shaped total for today's consumers to keep reading it unchanged. If a granularity consumer appears, an additional optional argument can be added without reopening this one.

## Out of scope

- The audit entry or billing record itself, which is a consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape, which providers already populate
- The `catch`-gates-`onError` property, still recorded as out of scope in the spec