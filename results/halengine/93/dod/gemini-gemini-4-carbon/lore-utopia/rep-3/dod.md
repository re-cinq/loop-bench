# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already exposes `hooks.afterModelResponse` and accepts a scripted `AIProvider` and `ToolRegistry`, so the acceptance tests drive real multi-round turns through `processMessage` and fail today because only the final round's usage is forwarded.

## Done when these pass

- [ ] **ChatOrchestrator afterModelResponse usage across tool rounds › reports the sum of three provider calls when a turn runs two tool rounds** — drives a turn through two tool rounds (three provider calls reporting 100/10/110, 200/20/220, and 300/30/330 tokens) and asserts `afterModelResponse` receives their sum (600/60/660) rather than only the last round's 300/30/330
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **ChatOrchestrator afterModelResponse usage across tool rounds › counts the rounds that reported usage when one round reports none, and reports undefined when none did** — drives a three-call turn where the middle round omits usage (40/8/48, none, 60/12/72) and a two-call turn where neither round reports usage, asserting the reporting rounds sum to 100/20/120 without `undefined` or `NaN` while a turn with no reported usage still reports `undefined`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate `inputTokens`, `outputTokens`, and `totalTokens` across every provider call in `src/orchestration/chatOrchestrator.ts` rather than overwriting `lastUsage`, skipping rounds that report `undefined` and keeping `undefined` when no round in the turn reported usage.
- [ ] Keep existing `src/orchestration/chatOrchestrator.test.ts` tests green unedited, including `receives collected response text and usage` (single-round no-tool turn) and `keeps the usage an earlier round reported when a later round reports none`.
- [ ] Decide between passing the summed total alone versus passing both summed total and per-round breakdown, make `OrchestratorHooks['afterModelResponse']` and its exported types unambiguous about what the hook receives (syncing any `doc-block` copies via `npm run docs:fix`), and record why the other shape was rejected.
- [ ] Keep `specs/hal-engine-config-hooks/spec.md` aligned with the chosen signature (re-running `node scripts/repoint-spec-anchors.mjs` and `npm run spec:names` if line numbers in `src/orchestration/chatOrchestrator.ts` shift) and add a `CHANGELOG.md` entry under `## [Unreleased]` stating the behaviour change in what an existing consumer records.

## Out of scope

- Audit entries, billing records, or downstream budget enforcement built by consumers on top of `afterModelResponse`
- Token accounting for anything other than the provider calls `chatOrchestrator` makes during a turn
- Changing the per-round `stop` chunk `usage` shape emitted by providers
- Non-`Error` rejections bypassing `onError` in `src/orchestration/chatOrchestrator.ts`