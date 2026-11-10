# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` already exposes the `hooks` seam (`beforeSession`, `onError`, `afterSession`) and `processMessage(session)`, so the acceptance test calls the real orchestrator entry point directly and fails on the missing `onError` and `afterSession` invocations when `beforeSession` throws.

## Done when these pass

- [ ] **ChatOrchestrator hooks — beforeSession failure > runs onError then afterSession when beforeSession throws, and still rejects to the caller** — When `beforeSession` throws an `Error`, `onError` runs with `(session, error)`, `afterSession` runs afterward without running turn hooks, and the caller still receives the rejection (`beforeSession` → `onError` → `afterSession`).
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block in `src/orchestration/chatOrchestrator.ts` so a throw reaches `catch` (`onError`) and `finally` (`afterSession`).
- [ ] Keep existing `beforeSession` and lifecycle hook tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` green and unedited.
- [ ] Ensure `specs/hal-engine-config-hooks/spec.md` states the guarantee and what `afterSession` can assume about how much of the turn happened when `beforeSession` throws, and add an entry under `## [Unreleased]` in `CHANGELOG.md` describing the behavior change for existing consumers.

## Out of scope

- The `instanceof Error` gate on `onError` (tracked in its own issue).
- Usage accounting across tool rounds (HALEngine#93).