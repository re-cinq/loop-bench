# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — the seam already exists. `createChatOrchestrator` accepts `OrchestratorHooks.afterModelResponse` and runs the round loop inside `processMessageStream`, so acceptance tests can drive a scripted multi-round `AIProvider` through `processMessage` and observe the usage handed to `afterModelResponse` today.

## Done when these pass

- [ ] **sums token usage across every provider call in a turn with two tool rounds** — drives two tool rounds (three provider calls) with distinct token counts (`100/20/120`, `250/40/290`, `400/60/460`) and expects `afterModelResponse` to receive the summed totals (`750/120/870`); fails today because `lastUsage` returns only the final call (`400/60/460`).
      `src/orchestration/usageAggregation.acceptance.test.ts`
- [ ] **counts rounds that report usage when others omit it, and yields undefined when none report** — drives a two-tool-round turn where the middle round omits `usage` (expects `40/10/50`, not `30/8/38`, `undefined`, or `NaN`) and a turn where no round reports `usage` (expects `undefined`); fails today because `partialUsage` receives only the final round (`30/8/38`).
      `src/orchestration/usageAggregation.acceptance.test.ts`

## Facets

- [ ] Accumulate `UsageMetadata` across every round in `src/orchestration/chatOrchestrator.ts` (`inputTokens`, `outputTokens`, `totalTokens`), skipping rounds where `outcome.usage` is `undefined` without producing `NaN` or erasing prior rounds, and passing `undefined` when no round reported usage.
- [ ] Decide between keeping one summed `usage` parameter (typed unambiguously, e.g. `TurnUsage` / JSDoc on `OrchestratorHooks.afterModelResponse`) vs passing the per-round breakdown as an additional parameter, while keeping the 3rd argument structurally `UsageMetadata` so existing single-round and partial-usage tests in `src/orchestration/chatOrchestrator.test.ts` stay green unedited; document why the other shape was rejected.
- [ ] Update `specs/hal-engine-config-hooks/spec.md` (and `specs/hal-engine-architecture/spec.md` / `CLAUDE.md` doc-blocks if signature changes) and add a `CHANGELOG.md` entry explaining the behaviour change for existing consumers.
- [ ] Add unit tests in `src/orchestration/` (outside `src/orchestration/usageAggregation.acceptance.test.ts`) if needed for any helper or edge cases, and verify `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint`, `npm run prettier:check`, `npm run spec:names`, `npm run check:spec-links`, and `node scripts/repoint-spec-anchors.mjs --check origin/main` all pass with no `any` in the public API.

## Out of scope

- The `instanceof Error` gate on `onError` still recorded under `Measured semantics — out of scope` in `specs/hal-engine-config-hooks/spec.md`.
- Editing the existing single-round `afterModelResponse` test (`receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts`), which must stay green unedited.
- Provider-level usage calculation inside Bedrock, Vertex, OpenAI, or Anthropic adapters.