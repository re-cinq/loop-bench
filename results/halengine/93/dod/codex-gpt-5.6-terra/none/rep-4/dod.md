# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `afterModelResponse` is the real public hook seam, and `createChatOrchestrator` already accepts an actual provider and `ToolRegistry`. A scripted provider drives the real tool loop without a test double, so the hook's observed usage is directly testable.

## Done when these pass

- [ ] **reports the sum from every provider call after two tool rounds** — the hook receives the aggregate of three known, distinct provider usages.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **counts reporting rounds around missing usage and leaves an entirely unreported turn undefined** — missing reports neither erase totals nor create `NaN`, and no reports remain absent.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **receives collected response text and usage** — the existing no-tool test remains unedited and preserves the single-call result.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Red: the two acceptance cases fail because the hook receives only the last reported provider usage.
- [ ] Green: aggregate every provider call's usage before invoking `afterModelResponse`, preserving `undefined` when no call reported usage.
- [ ] API and docs: make the aggregate semantics unambiguous in the hook's public type, update the config-hooks spec, and add the required CHANGELOG migration note.

## Out of scope

- Creating billing or audit records, accounting for work other than provider calls, and changing the streamed `stop` chunk usage shape.