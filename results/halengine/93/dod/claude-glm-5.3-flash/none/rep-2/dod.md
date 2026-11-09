# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` takes any `AIProvider`, and the existing suites drive it with a scripted provider whose rounds are known. The acceptance tests call that real entry point today and fail on the under-counted number, so no new module is needed.

## Done when these pass

- [ ] **reports usage covering every provider call of a two-tool-round turn, with rounds reporting known, different counts** — a turn driven through two tool rounds hands the hook usage equal to the sum of both provider calls (100+200 in, 10+20 out); red today because the hook receives the last round's counts alone
  `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [ ] **counts the rounds that reported when a round reports no usage, and still reports nothing when none did** — a round whose provider reported no usage neither voids the total nor turns it NaN, and a turn where no round reported still reports `undefined`
  `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [ ] **receives collected response text and usage** (EXISTING guard, must stay green and unedited) — a turn with no tool calls reports exactly what it reports today
  `src/orchestration/chatOrchestrator.test.ts`
- [ ] **keeps the usage an earlier round reported when a later round reports none** (EXISTING guard, must stay green and unedited) — an accumulate implementation that skips rounds without usage satisfies this as written
  `src/orchestration/chatOrchestrator.test.ts`
- [ ] **hands afterModelResponse text ending in the sentence, and the usage of a run without the hook** (EXISTING guard, must stay green and unedited) — the budget-exhausted path reports whatever the turn reports, in both hook configurations
  `src/orchestration/toolBudget.test.ts`

## Facets

- [x] Run the two acceptance tests red, quoted in the round report (this pod; no production code written).
- [ ] Choose the signature shape — accumulate into one `usage` argument, or sum plus per-round breakdown — and record in the PR why the other was rejected. The tests pin only what the ticket's criteria already force: the hook's usage argument covers every provider call of the turn, and a no-tool turn's value does not move.
- [ ] `chatOrchestrator.ts`: replace the `lastUsage` keep-last local with accumulation across rounds, skipping rounds whose provider reported no usage; when no round reported, the hook still receives `undefined`. A no-tool turn must produce byte-identical output to today.
- [ ] Make the signature say the answer (acceptance criterion 4): the `afterModelResponse` member's usage type or its one-line JSDoc states that the number is the turn's sum, so a reader needs no orchestrator source; no `any` in the public API. Judged by review, not by a test — a test could only pin a type name, and the ticket leaves the shape to this round.
- [ ] `specs/hal-engine-config-hooks/spec.md`: replace the recorded under-counting statement (the "Measured semantics — out of scope" bullet beginning "`afterModelResponse` is called once per user message after the round loop exits") with the new behaviour, cited as `([validated by: reports usage covering every provider call of a two-tool-round turn, with rounds reporting known, different counts](../../src/orchestration/chatOrchestratorUsage.acceptance.test.ts#L69))`. There is no `scripts/spec-links/reanchor.mjs` here; repoint the line with `npm run spec:names:fix` after any edit above the test.
- [ ] `CHANGELOG.md`: under `## [Unreleased]` → `### Changed`, one entry stating that what an existing consumer records gets larger on tool-heavy turns, with the migration note the repo's entries carry, and the MINOR bump it implies.
- [ ] Green: `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestratorUsage.acceptance.test.ts src/orchestration/chatOrchestrator.test.ts src/orchestration/toolBudget.test.ts`. `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint` (`--max-warnings 0`) and `npm run prettier:check` are CI's to prove (`.github/workflows/ci.yml`), not this pod's.

## Out of scope

- The audit entry or billing record itself — a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape, which providers already populate; this issue only aggregates what the orchestrator saw.
- Whether a per-round breakdown argument is added: the ticket leaves that decision to the implementation round, so the tests do not pin one. A shape that moved the no-tool turn's value is excluded by the existing unedited guard test instead.