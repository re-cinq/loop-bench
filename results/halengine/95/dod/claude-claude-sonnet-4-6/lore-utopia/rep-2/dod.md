# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The seam already exists: `createChatOrchestrator` accepts an `onError` hook and the `catch` block in `processMessageStream` is the precise site. A provider that throws a non-Error value exercises the gate directly through the real entry point.

## Done when these pass

- [ ] **calls onError with wrapped Error when provider rejects with a string, and re-throws the original string** — `onError` is called once; the argument is an `Error` whose `.cause` is the original string; the caller receives the original string, not a wrapper
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError with wrapped Error when provider rejects with a plain object, and re-throws the original object** — same contract holds for a plain object rejection
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError with wrapped Error when provider rejects with undefined, and re-throws undefined** — same contract holds for an `undefined` rejection
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] In `chatOrchestrator.ts` catch block: replace `if (hooks?.onError && error instanceof Error)` with unconditional `onError` call, wrapping non-Error values as `new Error('Non-error rejection', {cause: error})` before passing to the hook
- [ ] Re-throw the original value unchanged (the existing `throw error` already does this)
- [ ] Update `specs/hal-engine-config-hooks/spec.md`: remove the "Measured semantics — out of scope" section (now obsolete) and ensure the new "Rejections that are not Error instances" section has the correct validated-by line numbers
- [ ] Update `CHANGELOG.md` with what changes for an existing consumer

## Out of scope

- `beforeSession` escaping the `try` block (tracked separately)
- Usage accounting across tool rounds (HALEngine#93)
- Changing the re-thrown value shape at the caller boundary — it stays exactly what it is today