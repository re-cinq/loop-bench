# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The seam already exists at line 91 of `src/orchestration/chatOrchestrator.ts`. The acceptance tests call the real entry point `processMessage()` and verify through the hook interface that `onError` and `afterSession` fire when `beforeSession` throws.

## Done when these pass

- [ ] **beforeSession throws, error reaches caller** — Verifies the rejection still propagates unchanged
  `src/orchestration/beforeSession-error-handling.acceptance.test.ts` (line 40: "error reaches the caller as a rejection")

- [ ] **beforeSession throws, onError fires** — Verifies `onError` hook is called with the error from `beforeSession`
  `src/orchestration/beforeSession-error-handling.acceptance.test.ts` (line 49: "onError hook fires with the error from beforeSession")

- [ ] **beforeSession throws, afterSession fires** — Verifies `afterSession` hook fires even when `beforeSession` throws
  `src/orchestration/beforeSession-error-handling.acceptance.test.ts` (line 75: "afterSession hook fires even when beforeSession throws")

- [ ] **beforeSession throws, onError and afterSession fire in order** — Verifies both hooks fire in the correct order
  `src/orchestration/beforeSession-error-handling.acceptance.test.ts` (line 96: "both onError and afterSession fire when beforeSession throws")

## Facets

- [ ] Move the `beforeSession` call from line 91 (before `try`) into the `try` block
- [ ] Ensure the error thrown by `beforeSession` is caught by the existing `catch` and `finally` blocks
- [ ] All acceptance tests pass with the expected hook firing order
- [ ] Existing tests remain unchanged and pass (validates non-throwing `beforeSession` behavior unchanged)
- [ ] All CI checks pass: `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint --max-warnings 0`, `npm run prettier:check`

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)
- Changes to spec wording and CHANGELOG (acceptance tests define behaviour; spec updates follow once implementation lands)