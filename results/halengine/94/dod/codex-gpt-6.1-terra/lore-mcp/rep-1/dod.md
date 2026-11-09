# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` accepts real lifecycle hooks and exposes `processMessage`, so the failure and its effects are observable through the existing entry point.

## Done when these pass

- [ ] **runs error and cleanup hooks when beforeSession throws** — the original error reaches the caller, `onError` receives the session and error, and `afterSession` runs afterward without processing user input.
      `src/orchestration/beforeSession.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the protected turn and preserve the original rejection while invoking both hooks.
- [ ] Replace the recorded flaw in the spec with the guarantee and explicitly explain what cleanup may assume after a failed `beforeSession`.
- [ ] Document the consumer-visible hook change in the changelog and retain the existing successful-session tests unchanged.
- [ ] Pass the repository's CI checks.

## Out of scope

- Non-Error rejections bypassing `onError` and usage accounting across tool rounds.