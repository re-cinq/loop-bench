# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — A seam already exists in `createChatOrchestrator` via `options.hooks`, but `beforeSession` is invoked outside the `try` block so errors bypass `catch` and `finally`.

## Done when these pass

- [ ] **runs onError then afterSession when beforeSession throws, and still rejects to the caller** — When `beforeSession` throws, `onError` and `afterSession` run in that order and the rejection propagates to the caller.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` call inside the `try` block in `src/orchestration/chatOrchestrator.ts` so throws enter `catch` and `finally`
- [ ] Verify `beforeSession` throw propagates to caller as rejection while `onError` and `afterSession` execute in order
- [ ] Verify existing tests for non-throwing `beforeSession` and full lifecycle order continue to pass unedited
- [ ] Add an entry in `CHANGELOG.md` under `[Unreleased]` documenting the fix and noting session state expectations for `afterSession`

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)