# Definition of Done

> `afterModelResponse` is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` plus the `afterModelResponse` hook is the real entry point, and a scripted in-memory `AIProvider` (the repo's existing tool-loop test idiom, and the thing the ticket names) drives real rounds whose per-round usage is known. No double is needed and no production code is replaced.

**Decision the tests encode** — the ticket's first shape: accumulate across rounds and keep one `usage` argument. The ticket pins the no-tool turn to "exactly what it reports today, pinned by the existing test remaining unedited", which rules out reshaping the third argument into a `{total, rounds}` structure (`toEqual` and the test's `UsageMetadata` typing both break). The other shape — a per-round breakdown beside the total — is rejected: this ticket has no consumer for the granularity (the audit/billing record is explicitly the consumer's concern), and an optional breakdown argument can be added later additively, never the reverse. What that choice owes in exchange is facet 2: the signature must say "sum" without opening the orchestrator. This branch already carries the spec half of acceptance criterion 5 — the recorded under-counting line in `specs/hal-engine-config-hooks/spec.md` is replaced by the four statements citing the tests below.

## Done when these pass

- [ ] **reports the sum of every provider call in a turn driven through two tool rounds** — three provider calls reporting known, different token counts (110 / 440 / 990) reach the hook as their sum (1400 / 140 / 1540); red today, which reports 990 — the final call alone
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **still totals the rounds that reported when a round reports no usage** — a silent round contributes nothing rather than undefining the total: rounds reporting 110 and 440 reach the hook as 550; red today, which reports 440
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **reports a turn with no tool calls exactly as the single provider call reported it** — green by construction, a guard: the common path must not move, and the unedited existing test below pins it too
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **reports nothing when no round in the turn reported usage** — green by construction, a guard: no round reporting leaves the hook's usage argument `undefined`, not zeroed and not `NaN`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] `src/orchestration/chatOrchestrator.ts`: replace the `lastUsage` carry-forward (`lastUsage = outcome.usage ?? lastUsage`, line 117) with a sum across the rounds that reported, `undefined` when none did; pass it to the `afterModelResponse` call at line 148. No `any`.
- [ ] Make the signature carry the answer by itself: the third parameter of `afterModelResponse` is named for a turn total (for example `totalUsage`) and typed by a dedicated exported type documented as the sum across every provider call in the turn, exported from `src/index.ts`. It must stay structurally a `UsageMetadata`, or the unedited no-tool test stops compiling.
- [ ] Regenerate the generated `OrchestratorHooks` block in `CLAUDE.md` (marker `<!-- doc-block: src/orchestration/chatOrchestrator.ts#OrchestratorHooks -->`, `npm run docs:fix`) — CI's "Documented code blocks" step gates it.
- [ ] `CHANGELOG.md` under `## [Unreleased]` → `### Changed`: one entry stating that what an existing consumer records grows for tool-heavy turns, with a MINOR bump, per the ticket and the repo's breaking-change rule. CI's "Changelog entry" step gates the file is touched.
- [ ] Leave both existing tests unedited and green: `receives collected response text and usage` (the no-tool pin the ticket names) and `keeps the usage an earlier round reported when a later round reports none` (still true under a sum — the only round that reported is the whole total).
- [ ] CI's `Verify` job holds the rest of the ticket's criterion 6: typecheck, eslint `--max-warnings 0`, prettier:check, build, and the full suite under the coverage floor. This pod ran only the acceptance file above.

## Out of scope

- The audit entry or billing record itself — a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape, which providers already populate; this issue only aggregates it.
- A per-round breakdown argument for consumers who want provider-call granularity — rejected for this ticket; a consumer appearing is a new issue that widens the hook's surface.