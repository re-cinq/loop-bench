# Definition of Done

> what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` exposes the real provider, tool registry, and `afterModelResponse` hook seams, so a scripted provider can observe the complete turn without mocks or source-text assertions.

## Done when these pass

- [ ] **reports summed usage across every provider call and nothing when none report** — the hook receives the sum of the first and final provider usages, while a middle round with no usage neither produces `undefined`/`NaN` nor contributes tokens, and an all-unreported turn remains `undefined`.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **receives collected response text and usage** — the existing no-tool test remains unedited and pins that a direct turn reports exactly its provider usage.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Make the public hook type communicate that its usage argument is the per-turn sum, without introducing `any`.
- [ ] Aggregate reported usage across all provider calls, preserving `undefined` when no call reports usage and preserving the no-tool result.
- [ ] Replace the spec's under-counting description and add an Unreleased changelog entry describing the larger usage existing consumers will record.

## Out of scope

- Per-round usage breakdowns, audit or billing consumers, non-provider token accounting, and the `stop` chunk's existing usage shape.