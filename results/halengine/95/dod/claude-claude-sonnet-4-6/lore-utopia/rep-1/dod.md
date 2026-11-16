# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` in `src/orchestration/chatOrchestrator.ts` already has a `catch` block at line 149 that calls `onError`; the fix is to change the `instanceof Error` guard so it wraps non-Error rejections before forwarding them. The acceptance tests call `processMessage` directly against a provider that rejects with a non-Error value.

## Done when these pass

- [ ] **calls onError with a wrapped Error whose cause is the string, and re-throws the original string to the caller** — provider rejects with a string; `onError` receives an `Error` wrapping it as `cause`; caller gets the original string
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError with a wrapped Error whose cause is the object, and re-throws the original object to the caller** — same guarantee for a plain-object rejection
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError with a wrapped Error whose cause is undefined, and re-throws undefined to the caller** — same guarantee when the rejection value is `undefined`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Change the guard in `src/orchestration/chatOrchestrator.ts` line 150: replace `error instanceof Error` check with unconditional call, wrapping non-Error values in `new Error('Non-Error rejection', {cause: error})` before passing to `onError`
- [ ] Keep the re-throw as `throw error` (original value, not the wrapper) so the caller receives the original rejection unchanged
- [ ] Remove the "Measured semantics — out of scope" section from `specs/hal-engine-config-hooks/spec.md` (or replace it with the now-guaranteed behavior — the three new spec statements already added cover this)
- [ ] Add a CHANGELOG entry for existing consumers: `onError` now fires for all rejections; hooks typed against `Error` keep compiling; the raw value is on `.cause`
- [ ] Verify existing `onError` tests (error already an `Error`) still pass unedited — the same instance must reach the hook, not a wrapper

## Out of scope

- `beforeSession` escaping the outer `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)
- Any change to what the caller receives — the re-thrown value stays the original rejection