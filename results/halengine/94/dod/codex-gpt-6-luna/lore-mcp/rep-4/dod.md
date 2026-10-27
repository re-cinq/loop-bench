# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage()` is the real entry point and accepts lifecycle hooks directly. The acceptance test throws from `beforeSession` and observes the rejection and both cleanup/error hooks.

## Done when these pass

- [ ] **rejects with the original error and runs onError and afterSession for the session** — Pins propagation unchanged and verifies both hooks receive the same session/error shape after `beforeSession` fails.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Run `onError` for a `beforeSession` rejection and preserve the original rejection to the caller.
- [ ] Run `afterSession` for a `beforeSession` rejection, after `onError`.

## Out of scope

- Changing `onError` handling for non-`Error` rejections.
- Usage accounting across tool rounds.