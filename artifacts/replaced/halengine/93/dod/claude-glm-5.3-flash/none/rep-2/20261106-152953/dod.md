# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator(...).processMessage(...)` drives a scripted provider through real tool rounds today, and the hook's third argument is observable from a test. The tests below go through the orchestrator's real entry point with a real `ToolRegistry` and a real `PromptBuilder`; only the provider is scripted, which is this repo's own convention for driving rounds (`chatOrchestrator.test.ts`).

## Done when these pass

Run them with:

```
node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/turnUsage.acceptance.test.ts
```

- [ ] **reports a turn total across two tool rounds, not only the last round** — a two-round tool turn whose rounds report known, different token counts delivers the per-field sum of both rounds plus the per-round breakdown to the hook, instead of the last round's usage alone
      `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **counts only the rounds that reported when a provider omits usage mid-turn** — a silent middle round neither poisons the total with `undefined`/`NaN` nor erases the rounds that did report; the breakdown lists the reporting rounds in call order
      `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **still reports nothing when no round in the turn reported usage** — a turn whose provider calls report no usage delivers `undefined` to the hook, not a zeroed or NaN total. This one is green today by design: it pins the floor, and it is what a wrong implementation (a zero-initialised accumulator, a sum over `undefined`) fails
      `src/orchestration/turnUsage.acceptance.test.ts`

## The contract these tests pin

- The hook's third argument carries the turn's usage: per-field (`inputTokens`, `outputTokens`, `totalTokens`) sum across every round that reported, `undefined` when none did.
- It also carries `rounds`: each reporting round's `UsageMetadata` in call order, present only when more than one round reported. That threshold is what keeps the ticket's "a turn that ran no tools reports exactly what it reports today" literally true — the unedited `chatOrchestrator.test.ts` test `receives collected response text and usage` compares with `toEqual` against a flat `UsageMetadata`, so a single-reporting-round turn must deliver a flat value with no `rounds` key.
- This folds the two shapes the issue weighed instead of choosing one: the numeric fields are option 1's summed total under the same field paths a consumer already reads, and `rounds` is option 2's per-call granularity. The reasoning is recorded in `specs/hal-engine-config-hooks/spec.md` (§ Usage reported to afterModelResponse).

## Facets

- [ ] Sum the rounds in `src/orchestration/chatOrchestrator.ts`: replace the keep-last `lastUsage = outcome.usage ?? lastUsage` local with per-field accumulation over the rounds that reported, `undefined` when none reported
- [ ] Make the signature say it: give the third parameter a turn-level type in `src/types/ai.ts` — `TurnUsage extends UsageMetadata` carrying `rounds?: UsageMetadata[]` is the shape the tests pin — and export it from `src/index.ts`; no `any` in the public API
- [ ] Existing tests that already pin surviving behaviour stay unedited and green: `receives collected response text and usage` (no-tool turn) and `keeps the usage an earlier round reported when a later round reports none` (single reporting round) in `src/orchestration/chatOrchestrator.test.ts`, and the afterModelResponse usage test in `src/orchestration/toolBudget.test.ts`
- [ ] `specs/hal-engine-config-hooks/spec.md` — done in this commit: the recorded under-counting line is replaced by the new behaviour, cited to these tests. Keep the citations pointing at the tests if names move
- [ ] Add the CHANGELOG `Changed` entry stating what an existing consumer will now record (larger totals on tool-heavy turns) — a behaviour change worth a MINOR bump per the ticket
- [ ] After editing `src/orchestration/chatOrchestrator.ts`, re-run `node scripts/repoint-spec-anchors.mjs` — the spec cites `chatOrchestrator.ts#L150` on the unchanged `instanceof` statement
- [ ] CI `Verify` job green: build, test, typecheck, eslint (`--max-warnings 0`), prettier:check

## Out of scope

- The audit entry or billing record itself — a consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape, which providers already populate; this issue only aggregates it
- Changing what a no-tool turn reports: it stays exactly today's value, pinned by the unedited existing test