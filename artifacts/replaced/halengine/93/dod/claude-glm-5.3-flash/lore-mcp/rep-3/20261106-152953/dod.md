# Definition of Done

> It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` plus a scripted provider and hooks, driven exactly the way `src/orchestration/chatOrchestrator.test.ts` drives it. The red comes from absent behaviour: the hook receives only the final round's usage, and no exported type names what it receives. Chosen shape: accumulate across rounds into the one usage argument, typed and exported as `TurnUsage` (the issue's first option); the per-round-breakdown shape is rejected — reason under Out of scope. Note for the next pod: ts-jest here runs without diagnostics, so a type annotation alone never turns a suite red; the type criterion is pinned by a test that drives the repo's own `typescript` compiler over a consumer snippet against the real modules.

## Done when these pass

- [ ] **sums the usage of every provider call in a turn that ran two tool rounds** — a scripted provider reports known, different token counts on each of three provider calls (two tool rounds plus the answer); `afterModelResponse` must receive `{inputTokens: 134, outputTokens: 36, totalTokens: 170}`, the sum, not the final round's `{4, 9, 13}`
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **types the usage afterModelResponse receives as TurnUsage, the turn total** — a consumer snippet annotating the hook's usage parameter as `TurnUsage` must type-check strict, against the real modules; today it fails with `Module './types/ai.js' has no exported member 'TurnUsage'`
      `src/orchestration/turnUsage.acceptance.test.ts`

- [ ] **still reports nothing when no round of a tool turn reports usage** — green today, by design: it guards the sum so a missing report never becomes `undefined`-or-`NaN` poisoning, and a turn where nothing reported still reports nothing
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [x] **receives collected response text and usage** — passes today and must stay green **unedited** (the issue's acceptance criterion): a no-tool turn reports exactly what it reports today, the single provider call's usage
      `src/orchestration/chatOrchestrator.test.ts`

- [x] **keeps the usage an earlier round reported when a later round reports none** — passes today and must stay green unedited: the rounds that reported are still counted once the sum lands
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts`, accumulate each round's reported usage across the loop and pass the turn's sum as `afterModelResponse`'s third argument: a round that reports nothing adds nothing, and a turn where nothing reported passes `undefined`
- [ ] Add `export type TurnUsage` to `src/types/ai.ts` with a one-line doc comment saying it is the sum across every provider call of one turn; type the hook's third parameter with it, name the parameter `turnUsage`, and add it to the type export list in `src/index.ts`
- [ ] CHANGELOG: a `### Changed` entry under `[Unreleased]` stating the change in what an existing consumer records — tool-heavy turns now record larger numbers; MINOR bump on release
- [ ] Regenerate the `OrchestratorHooks` block in `CLAUDE.md` (`node scripts/check-doc-blocks.mjs --fix`) — the block is generated from the declaration, which changes
- [ ] Reword the two statements in `specs/hal-engine-architecture/spec.md` that describe the old fallback (they cite `receives collected response text and usage` and `keeps the usage an earlier round reported when a later round reports none`) so the prose describes the sum; the cited tests stay green, only the prose moves
- [ ] Record in the issue why the per-round-breakdown shape was rejected (see Out of scope)
- [ ] Run the two acceptance files plus the two named existing tests; `node scripts/check-spec-anchor-names.mjs` and `node scripts/check-spec-status.mjs` stay green; run `node scripts/repoint-spec-anchors.mjs` after any edit that shifts lines in a cited file — this branch's config-hooks spec anchors were authored against the working tree, so the repointer skips that spec whole

## Out of scope

- The audit entry or billing record itself — a consumer's concern, not the engine's
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape — providers already populate it; this issue only aggregates
- A per-round breakdown argument (the issue's second option): rejected because the total is what a billing or audit consumer records, provider-call granularity is recoverable from provider logs, and a second argument widens the public surface for a need no consumer has raised