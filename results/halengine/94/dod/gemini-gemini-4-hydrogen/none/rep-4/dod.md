# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` already exposes the `OrchestratorHooks` seam (`beforeSession`, `onError`, `afterSession`), so the acceptance tests drive `createChatOrchestrator` directly and fail today because `beforeSession` sits outside `try`.

## Done when these pass

- [ ] **fires onError with the session and error and still rejects when beforeSession throws** — `onError` receives `(session, error)` and the rejection still reaches the caller when `beforeSession` throws an `Error`
  `src/orchestration/beforeSessionFailure.acceptance.test.ts`

- [ ] **fires afterSession after onError without starting the turn when beforeSession throws** — `afterSession` fires after `onError` and no downstream turn hook or provider call executes when `beforeSession` throws
  `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block in `src/orchestration/chatOrchestrator.ts`
- [ ] Verify existing `beforeSession` and hook-order tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` stay green without edits
- [ ] Replace the recorded-flaw bullet in `specs/hal-engine-config-hooks/spec.md` (`## Measured semantics — out of scope`) and document what `afterSession` can assume when `beforeSession` fails
- [ ] Add a `CHANGELOG.md` entry under `## [Unreleased]` describing the change for consumers
- [ ] Run `npm run verify` (build, tests with coverage, typecheck, eslint, prettier, spec checks)

## Out of scope

- The `error instanceof Error` gate on `onError` (separate issue)
- Usage accounting across tool rounds (`re-cinq/HALEngine#93`)