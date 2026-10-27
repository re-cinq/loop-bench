# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` exposes the real `afterModelResponse` hook and accepts a provider plus tool registry, so acceptance tests can drive actual tool rounds with a scripted provider.

## Done when these pass

- [ ] **reports usage covering every provider call in a tool turn** — a two-round tool turn passes the summed input, output, and total tokens to `afterModelResponse`
      `src/orchestration/usageReporting.acceptance.test.ts`
- [ ] **counts reported rounds while leaving a turn with no usage undefined** — usage from reported rounds survives unreported rounds, while a turn with no reported usage remains `undefined`
      `src/orchestration/usageReporting.acceptance.test.ts`
- [ ] **receives collected response text and usage** — the existing no-tool turn continues to receive its unchanged usage value
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Sum usage across every provider round without changing the no-tool result.
- [ ] Ignore missing round usage and preserve `undefined` when no round reports usage.
- [ ] Make the public hook type and specification describe the aggregate value, and record the consumer-visible change in the changelog.

## Out of scope

- Audit entries, billing records, and accounting outside provider calls.
- The stop chunk's existing usage shape or per-provider-call breakdown.