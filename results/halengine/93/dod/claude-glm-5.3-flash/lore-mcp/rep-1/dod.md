# Definition of Done

> `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — the seam exists today: `createChatOrchestrator` plus a scripted provider drives a real multi-round turn through `afterModelResponse`, and the hook's third argument is observable right now (it arrives as the last round's usage, not the sum). No new module, no characterization needed: the tests call the real entry point and fail on behaviour.

## Done when these pass

- [ ] **hands the hook the usage of every provider call in the turn, summed across tool rounds** — a turn driven through two tool rounds (three provider calls) reports the per-field sum of all three rounds' usage to `afterModelResponse`, in one firing; asserted against a scripted provider whose rounds report known, different token counts (110/45/70 total → 225)
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **skips rounds that report no usage, and still reports nothing when no round reports** — a silent middle round contributes nothing rather than making the total `undefined`/`NaN`: the rounds that reported are still summed; and a turn where no round reported still hands the hook no usage
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

The ticket's other behaviour pin is an existing test and is not re-listed here (so this file's path list stays acceptance-only): a turn with no tool calls must report exactly what it reports today, pinned by `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` — it stays unedited and green, and is cited from the spec's new "Turn usage reported to afterModelResponse" section.

## Facets

- [x] Write the red acceptance tests in a new file, `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`, and record the new behaviour in `specs/hal-engine-config-hooks/spec.md`: the "Measured semantics — out of scope" under-counting line is replaced by a cited "Turn usage reported to afterModelResponse" section (three statements: the sum, the skip/no-report rule, the unchanged no-tool path).
- [ ] Accumulate across rounds in `src/orchestration/chatOrchestrator.ts`: replace the `lastUsage = outcome.usage ?? lastUsage` fallback with a per-field sum that skips rounds reporting no usage, keeping one `usage` argument. Both tests above go green; the existing no-tool pin stays green unedited.
- [ ] Make the signature say the answer (acceptance criterion 4): the hook's usage parameter type or its one-line doc states it is the turn's total, so a reader need not open the orchestrator; record on the issue/PR why the per-round-breakdown shape was rejected. Review-judged, not test-pinned: both shapes produce the same observable sum, so a test here would pre-empt the decision the ticket leaves open.
- [ ] CHANGELOG under `[Unreleased]` → `Changed`: state that an existing consumer records a larger number for tool-heavy turns (MINOR bump per repo breaking-change policy — behaviour change, not a signature break).
- [ ] After editing `chatOrchestrator.ts`, hand-check the `chatOrchestrator.ts#L150` anchor in `specs/hal-engine-config-hooks/spec.md`: `node scripts/repoint-spec-anchors.mjs` skips this spec whole (its citation set now differs from origin/main), so no tool repoints it for you.

CI is the judge for the rest of the ticket's checklist (`npm run build`, `npm test`, `npm run typecheck`, `npm run eslint --max-warnings 0`, `npm run prettier:check`, no `any` in the public API) — the Verify workflow runs all of it on every push of this branch.

## Out of scope

- The audit entry or billing record itself — a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape — providers already populate it; this issue only aggregates.
- Whether the hook also receives a per-round breakdown: the summed total is pinned by the tests; the extra parameter is the implementing round's recorded decision and carries no test.