# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` exposes the real orchestration entry point, and a provider can exercise its rejection boundary without mocks or production changes.

## Done when these pass

- [ ] **calls onError once for non-Error provider rejections with a caused Error and preserves the rejection** — string, plain-object, and `undefined` rejections reach `onError` as `Error` instances with the original value as `cause`, while the caller receives the original value unchanged.
      `src/orchestration/onErrorNonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Exercise a string rejection through `processMessage` and verify the hook and caller boundary.
- [ ] Exercise plain-object and `undefined` rejections through the same boundary.
- [ ] Preserve the existing Error-instance behavior covered by the unedited orchestrator tests.

## Out of scope

- Changing the value re-thrown to callers.
- `beforeSession` escaping the `try` or usage accounting across tool rounds.
- Updating the spec guarantee or CHANGELOG entry; those are implementation-round documentation work after this red contract.