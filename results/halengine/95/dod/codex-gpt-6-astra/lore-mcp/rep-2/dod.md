# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` exposes the shared catch through lifecycle callbacks. A real callback rejects with each required value without provider doubles; the test checks the same catch that handles provider rejections.

## Done when these pass

- [ ] **reports every rejection as an Error while preserving the original caller rejection** — string, plain object and `undefined` each reach `onError` exactly once as an `Error` with the identical original `cause`; existing Errors retain identity, the session is preserved, and the caller rejects with the identical original value.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Remove the `instanceof Error` delivery gate and normalize non-Error rejections only for `onError`, preserving the original rethrow.
- [ ] Keep existing orchestrator tests unedited; the acceptance test additionally pins Error identity, which the existing tests only check by message.
- [ ] Keep the linked rejection guarantee in `specs/hal-engine-config-hooks/spec.md` true and add a consumer-facing CHANGELOG entry explaining broader error-hook delivery and `cause` access.
- [ ] Let CI verify the existing suite, build, typecheck, lint and formatting after the acceptance test turns green.

## Out of scope

- Changes to `beforeSession` placement, usage accounting (#93), provider retry policies, or errors thrown by `onError` itself.
- Provider test doubles: the acceptance test raises the values through the existing lifecycle callback seam into the common catch instead.