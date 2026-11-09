# Definition of Done

> `afterModelResponse` is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` takes a scripted provider and an installed `afterModelResponse` hook, the same pattern `src/orchestration/chatOrchestrator.test.ts`'s tool-loop block already uses, so each test drives a real turn through the real entry point and fails today on the behaviour itself.

## Done when these pass

- [ ] **reports usage summed across every provider call of a two-round tool turn** — a turn driven through two tool rounds reports usage covering every provider call in that turn, against a scripted provider whose rounds report known, different token counts (acceptance criterion 1)
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **counts the rounds that reported when a middle round reports no usage** — a round that reports no usage does not make the total `undefined` or `NaN`; the rounds that reported are still counted (acceptance criterion 3, first half)
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **reports no usage when no round of the turn reported any** — a turn where nothing reported still reports nothing (acceptance criterion 3, second half). Green today by design — the ticket pins the nothing-reported path as unmoved — so it is a guard on the new arithmetic, not a red bar: it is what stops a naive accumulator seeded with `{inputTokens: 0, …}` or NaN'd by `+ undefined` from passing the two red tests.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Sum the rounds' `outcome.usage` in the round loop (skip rounds that report none, seed nothing) so the third argument `afterModelResponse` receives is the turn total. Red tests 1 and 2 close this.
- [ ] Shape contract: the third argument stays the bare summed `UsageMetadata`. A per-round breakdown may be ADDED alongside it (e.g. a fourth argument), but must not REPLACE the third argument — acceptance criterion 2 pins the single-round shape through the existing unedited test, which asserts bare-`UsageMetadata` equality.
- [ ] Acceptance criterion 2: `src/orchestration/chatOrchestrator.test.ts` › `afterModelResponse` › "receives collected response text and usage" (currently line 236) remains green and UNEDITED. Verified green today (24 passed). It is cited from `specs/hal-engine-config-hooks/spec.md` § Usage reporting, so CI holds it; run it alongside the acceptance file rather than through this list, so the Bash hook does not lock you out of your own suite.
- [ ] Acceptance criterion 4 is a property of the signature, not of runtime behaviour, and has no honest behavioural test: make the type (or its one-line JSDoc, the `re-lint/max-comment-lines` cap allows one line) say "summed across the turn" so a reader of `OrchestratorHooks` need not open the orchestrator. No `any` in the public API.
- [ ] Acceptance criterion 5, second half: add a `CHANGELOG.md` `[Unreleased]` **Changed** line stating that for tool-heavy turns an existing consumer now records the turn total rather than the last provider call's usage (MINOR bump territory, per the ticket).
- [ ] Acceptance criterion 5, first half: done in this commit — `specs/hal-engine-config-hooks/spec.md` replaces its recorded under-counting line with § Usage reporting, citing the three acceptance tests above. The spec's anchor set now differs from `origin/main`'s, so `node scripts/repoint-spec-anchors.mjs` skips it whole; the new citations were hand-anchored to the `it(` lines (L66, L83, L100) and `npm run spec:names` holds them to the names.
- [ ] Acceptance criterion 6 (`npm run build`, `npm test`, `npm run typecheck`, `npm run eslint --max-warnings 0`, `npm run prettier:check`) is CI's to prove on the pull request, not this pod's.

## Out of scope

- The audit entry or billing record itself — a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape — providers already populate it; this issue only aggregates it.
- Editing `src/orchestration/chatOrchestrator.test.ts` (criterion 2 forbids it) or the `| Status |` row of any spec.