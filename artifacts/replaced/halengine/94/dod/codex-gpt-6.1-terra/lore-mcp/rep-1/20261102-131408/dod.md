# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` accepts real lifecycle hooks and exposes `processMessage`, so the failure and cleanup are observable through the existing entry point.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession while preserving the rejection** — A failed setup reaches the caller unchanged, invokes `onError` with the session and error, and then invokes `afterSession` before any user-input processing.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the existing error and cleanup path and make the acceptance test green.
- [ ] Replace the recorded flaw in the spec with the guarantee and explicitly state what cleanup can assume about a failed setup.
- [ ] Describe the change for existing consumers in the CHANGELOG; keep existing successful-session tests unedited and the CI checks green.

## Out of scope

- Non-Error rejections bypassing `onError` and usage accounting across tool rounds.