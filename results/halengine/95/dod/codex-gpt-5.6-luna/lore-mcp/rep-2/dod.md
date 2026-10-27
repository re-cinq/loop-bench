# Definition of Done

> Call `onError` for every rejection. Whatever is not already an `Error` gets wrapped in one, preserving the original as the `cause`, so a hook typed against `Error` keeps compiling and a hook that wants the raw value can still reach it. The re-thrown value at the caller boundary stays exactly what it is today, so nothing downstream changes shape.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real entry point and accepts a provider plus `onError` hook, so the acceptance test can observe both hook delivery and caller propagation without mocks or a replacement seam.

## Done when these pass

- [ ] **calls onError with a wrapped Error and preserves the original rejection at the caller boundary** — string, plain-object, and `undefined` provider rejections each reach `onError` once as an `Error` with the original value as `cause`, while the caller receives the exact original value
      `src/orchestration/onErrorNonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Wrap every non-`Error` rejection before invoking `onError`, preserving it as `cause`.
- [ ] Keep the original rejection unchanged at the caller boundary.
- [ ] Update the hook specification and changelog for existing consumers.

## Out of scope

- Re-wrapping rejections that are already `Error` instances; existing tests pin their identity.
- `beforeSession` escaping the `try` and usage accounting across tool rounds.