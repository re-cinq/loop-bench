# Definition of Done

> Call `onError` for every rejection. Whatever is not already an `Error` gets wrapped in one, preserving the original as the `cause`, so a hook typed against `Error` keeps compiling and a hook that wants the raw value can still reach it. The re-thrown value at the caller boundary stays exactly what it is today, so nothing downstream changes shape.

**Strategy: `direct`** — `createChatOrchestrator` accepts a provider and hooks, so its real `processMessage` entry point can expose the missing `onError` call for provider rejections.

## Done when these pass

- [ ] **calls onError once with the original cause and preserves each non-Error provider rejection** — string, plain object, and `undefined` failures each reach `onError` once as an `Error` with the original cause; an existing `Error` keeps its identity, and the caller receives every original rejection.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Remove the `instanceof Error` gate in the orchestrator catch and wrap non-`Error` values for `onError`, preserving the raw rejection for the caller.
- [ ] Keep existing tests for `Error` identity green without editing them.
- [ ] Add a consumer-facing CHANGELOG entry for the newly reported failures.
- [ ] Run the repository's required CI checks once the behavior is implemented.

## Out of scope

- `beforeSession` escaping the turn's `try` and usage accounting across tool rounds.