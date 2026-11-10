# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` already exposes `options.hooks` and `processMessage(session)` as its public entry point; an acceptance test can install `beforeSession`, `onError`, and `afterSession` directly today and fail because `beforeSession` sits above the `try` block in `src/orchestration/chatOrchestrator.ts`.

## Done when these pass

- [ ] **ChatOrchestrator beforeSession failure runs onError then afterSession when beforeSession throws, and still rejects to the caller** — When `beforeSession` throws an `Error`, `onError` fires with the session and that error, `afterSession` fires after `onError`, no subsequent turn hooks run, and `processMessage` rejects with the thrown error.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block in `src/orchestration/chatOrchestrator.ts` so a throw from `beforeSession` reaches `catch` (`onError`) and `finally` (`afterSession`) before rejecting to the caller.
- [ ] Leave the existing `beforeSession` and lifecycle-order tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` unedited and green.
- [ ] Record what `afterSession` can assume about how much of the turn happened in `specs/hal-engine-config-hooks/spec.md` (replacing the recorded-flaw bullet) and add an entry under `[Unreleased]` in `CHANGELOG.md` describing the behaviour change for existing consumers.

## Out of scope

- The `instanceof Error` gate on `onError` (tracked in its own issue, HALEngine#95).
- Usage accounting across tool rounds in `afterModelResponse` (tracked in HALEngine#93).