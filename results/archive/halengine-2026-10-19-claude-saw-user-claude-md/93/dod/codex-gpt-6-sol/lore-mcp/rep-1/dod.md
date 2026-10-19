# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already accepts a provider, a real tool registry and an `afterModelResponse` hook. A scripted provider can drive its existing tool loop and expose the usage sent to the hook.

## Done when these pass

- [ ] **sums the usage of every provider call across two tool rounds** — Three provider calls with different counts produce the sum of all three token fields.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **sums reported rounds across a missing round and leaves an entirely unreported turn undefined** — Missing usage between reported calls does not discard earlier usage, and an entirely unreported turn stays undefined.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] Sum `inputTokens`, `outputTokens` and `totalTokens` across all provider calls in one turn, ignoring calls without usage.
- [x] Preserve `undefined` when every provider call omits usage and keep the existing one-call test in `src/orchestration/chatOrchestrator.test.ts` unedited and green.
- [ ] Name the hook parameter or public type so its turn-wide meaning is clear in the signature, with no public `any`.
- [ ] Explain in the issue why the per-round breakdown shape was rejected in favor of one summed value.
- [x] Add a CHANGELOG entry explaining that existing consumers record larger totals for tool turns and make the MINOR version change.
- [ ] Keep the new usage statements in `specs/hal-engine-config-hooks/spec.md` accurate once implementation lands, without changing its `Status` row in this round.
- [ ] Pass the repository's build, test, typecheck, eslint and prettier gates in CI.

## Out of scope

- The unrelated `onError` behavior documented in the same spec.
- Consumer billing or audit records, non-provider token accounting and the provider `stop` chunk format.