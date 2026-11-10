# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` already accepts `options.hooks` with `beforeSession`, `onError`, and `afterSession`, so the acceptance test calls `processMessage` directly with a throwing `beforeSession` hook and fails on the missing `onError` and `afterSession` calls today.

## Done when these pass

- [ ] **runs onError then afterSession when beforeSession throws, and still rejects to the caller** — When `beforeSession` throws an `Error`, `onError` fires with the session and the thrown error, `afterSession` fires after `onError` without later turn hooks running, and `processMessage` rejects with the original error.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block in `src/orchestration/chatOrchestrator.ts` so a throw from `beforeSession` enters `catch` (`onError`) and `finally` (`afterSession`) while still rejecting to the caller.
- [ ] Leave the existing `beforeSession` and lifecycle order tests in `src/orchestration/chatOrchestrator.test.ts` unedited and green.
- [ ] Ensure `specs/hal-engine-config-hooks/spec.md` states what `afterSession` can assume about how much of the turn happened when `beforeSession` fails, and add a `CHANGELOG.md` entry under `## [Unreleased]` describing the behaviour change for existing consumers.

## Out of scope

- The `instanceof Error` gate on `onError` (tracked in its own issue)
- Usage accounting across tool rounds (HALEngine#93)