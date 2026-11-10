# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` already accepts `hooks` through `ChatOrchestratorOptions` and exposes `processMessage`, so the acceptance test calls `processMessage` with a throwing `beforeSession` hook and fails directly on the missing `onError` and `afterSession` invocations.

## Done when these pass

- [ ] **ChatOrchestrator when beforeSession throws runs onError then afterSession and rejects with the thrown error when beforeSession throws** — When `beforeSession` throws, `onError` fires with `(session, error)` followed by `afterSession` with `(session)`, no intermediate turn hooks or provider calls run, and the rejection still reaches the caller.
      `src/orchestration/beforeSessionThrow.acceptance.test.ts`

## Facets

- [ ] Move `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block of `processMessageStream` in `src/orchestration/chatOrchestrator.ts`.
- [ ] Update `specs/hal-engine-config-hooks/spec.md` (including line numbers if `chatOrchestrator.ts` shifts) and add an entry under `## [Unreleased]` in `CHANGELOG.md` describing the new hook lifecycle behaviour for consumers.

## Out of scope

- The `instanceof Error` gate on `onError`
- Usage accounting across tool rounds (`afterModelResponse` `lastUsage`)