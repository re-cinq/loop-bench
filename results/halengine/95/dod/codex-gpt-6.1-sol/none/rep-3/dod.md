# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — Both orchestrator entry points expose the shared catch through configured hooks. A real rejecting lifecycle hook supplies string, object and undefined values without provider doubles; the real in-process provider and prompt builder are used unchanged.

## Done when these pass

- [ ] **reports non-Error rejections once with their original cause and preserves caller rejection identity** — Both entry points notify once with the session and an Error carrying the exact original cause, including an own undefined cause, and reject with the original value.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Normalize every non-Error caught rejection for onError, preserving the original cause and the original caller rejection.
- [ ] Preserve existing Error instance forwarding and leave existing tests unedited.
- [ ] Keep the new spec guarantee accurate and add a CHANGELOG entry explaining the effect on existing hook consumers.
- [ ] Pass the acceptance test and the repository checks in CI.

## Out of scope

- Changes to beforeSession placement, tool-round usage accounting, or failures thrown by onError itself.
- Provider-specific error conversion and changes to the caller's rejection shape.