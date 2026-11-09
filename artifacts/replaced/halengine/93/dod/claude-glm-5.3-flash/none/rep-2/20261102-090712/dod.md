# Definition of Done

> `afterModelResponse` is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` takes any `AIProvider`, so a scripted provider drives real tool rounds through the real round loop and the hook's third argument is observable. The acceptance tests call `processMessage` and fail on the usage the hook received, not on a missing seam.

**Signature decision** (the issue asks that it be recorded): accumulate across rounds and keep ONE `usage` argument — the sum over the rounds that reported — typed by a new dedicated exported type (name it `TurnUsage`; three `UsageMetadata`-shaped number fields) whose declaration states it is the turn's total, declared in `src/types/ai.ts` and re-exported through `src/types/index.ts` and `src/index.ts`. The per-round-breakdown shape is rejected: criterion 2 pins the existing no-tool test unedited, and any wrapped object (sum + `rounds` fields) breaks its `toEqual`; no consumer of a breakdown is named in the issue; per-call granularity stays available on each round's `stop` chunk, which the orchestrator already streams through. A fourth positional parameter is rejected with it: wider surface, no stated need. The MINOR bump and changelog line are still owed, because the number an existing consumer records grows on exactly the tool-heavy turns.

## Done when these pass

- [ ] **reports the sum of every round that reported, not the last round alone** — a turn driven through two tool rounds reports usage covering every provider call: 120/35/155 plus 40/18/58 arrives as 160/53/213, not the last round's 40/18/58 (red today)
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **keeps counting the rounds that reported when a round in between reports none** — a silent round neither zeroes, NaNs nor ends the total; the reporting rounds around it are still summed (red today)
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **still reports nothing when no round in the turn reported usage** — a guard, green today and it must stay so: the sum must not surface as `{0,0,0}` when no round reported
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] `chatOrchestrator.ts`: replace the `lastUsage` local with a turn total accumulated across rounds — each field summed over the rounds that reported `usage`, a round that reported none adding nothing, and a turn where nothing reported still passing `undefined` — and pass that to `afterModelResponse`
- [ ] Type the third argument with the new dedicated type and give its declaration a one-line JSDoc saying it is the sum across the turn's provider calls. This is acceptance criterion 4 and it has no red test on purpose: TS is structural, so a renamed type identical to `UsageMetadata` cannot be distinguished at runtime; review and `npm run typecheck` hold it
- [ ] Run `node scripts/check-doc-blocks.mjs --fix` after touching the declaration: the `OrchestratorHooks` block is generated into `CLAUDE.md` and `specs/hal-engine-architecture/spec.md`, and CI's `npm run docs:check` compares the blocks to the source byte-for-byte
- [ ] The spec's new section `Usage reported to afterModelResponse` (committed with these tests) becomes true; its citations already point at the acceptance tests, and if the orchestrator edit shifts test lines, repoint with `npm run spec:names:fix`; `npm run check:spec-links` and `npm run check:spec-status` are the gates
- [ ] CHANGELOG: under `## [Unreleased]` → `### Changed`, one entry stating the change in what an existing consumer records (the `usage` argument is now the turn's summed total, larger on tool-heavy turns) with a migration note; MINOR bump per the repo's behaviour-change rules
- [ ] `afterModelResponse > receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` — acceptance criterion 2 — stays UNEDITED and green. No existing test anywhere needs editing: none drives two reporting rounds through the hook
- [ ] Then CI's checklist: `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint` (`--max-warnings 0`), `npm run prettier:check`, no `any` in the public API

## Out of scope

- The audit entry or billing record itself — a consumer's concern, per the issue
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape — providers already populate it; this issue only aggregates
- A per-round breakdown in the hook signature — rejected, see the signature decision above
- README, `docs/getting-started.md` and `example/` hook snippets — they log whatever arrives and stay truthful under the sum