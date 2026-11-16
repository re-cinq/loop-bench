# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` in `src/orchestration/chatOrchestrator.ts` already accepts `OrchestratorHooks.afterModelResponse` and drives the provider round loop through `processMessage` / `processMessageStream`. A scripted `AIProvider` can supply distinct per-round `UsageMetadata` values (including rounds that omit usage) and observe what `afterModelResponse` receives without any new seam or test double.

## Done when these pass

- [ ] **sums usage across every provider call in a multi-round tool turn** — drives a two-tool-round turn (three provider calls with distinct token counts) and requires `afterModelResponse` to receive the summed `inputTokens`, `outputTokens`, and `totalTokens` across all three calls rather than only the final call's usage
  `src/orchestration/usageReporting.acceptance.test.ts`
- [ ] **counts reported rounds when some omit usage, and reports undefined when none do** — drives one turn where the middle round omits `usage` (asserting the reported rounds still sum cleanly without `undefined` or `NaN`) and another turn where no round reports `usage` (asserting `afterModelResponse` is called with `undefined`)
  `src/orchestration/usageReporting.acceptance.test.ts`

## Facets

- [ ] Decide between keeping one summed `usage` parameter (naming the parameter/type so it unambiguously denotes a turn total) versus adding an optional per-round breakdown parameter, keeping the 3rd argument as the summed `UsageMetadata | undefined` so the existing single-round test (`receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts`) stays green unedited, and record why the other shape was rejected in the PR/issue
- [ ] Accumulate `UsageMetadata` across every round in `src/orchestration/chatOrchestrator.ts` (ignoring rounds whose `usage` is `undefined`, returning `undefined` when no round reported usage) instead of overwriting `lastUsage`
- [ ] Update the `OrchestratorHooks.afterModelResponse` signature/type in `src/orchestration/chatOrchestrator.ts` (and export any new type from `src/index.ts` if introduced) so the type makes clear it is the summed turn usage, with no `any` in the public API; refresh any `doc-block` references in `CLAUDE.md` and `specs/hal-engine-architecture/spec.md`
- [ ] Finalize `specs/hal-engine-config-hooks/spec.md` (documenting the chosen signature/type semantics where the under-counting line used to sit) and add a `CHANGELOG.md` entry explaining the behaviour change for existing consumers on tool-heavy turns
- [ ] Verify `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint`, `npm run prettier:check`, and `npm run docs:check` all pass

## Out of scope

- The `instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts`
- Audit entry or billing record formatting/persistence (consumer responsibility)
- Token accounting outside provider calls made by the orchestrator, or changing the `stop` chunk's own `usage` shape