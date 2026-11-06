# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The seam is `createChatOrchestrator` in `src/orchestration/chatOrchestrator.ts`; the `catch` block at line 150 is directly callable from tests today. No new module or structural change is needed to reach the behaviour.

## Done when these pass

- [ ] **calls onError with a wrapping Error whose cause is the original string/plain-object/undefined rejection, and the caller receives the original value** — three parameterised cases (`'boom string'`, `{code: 'ERR_CUSTOM'}`, `undefined`): each asserts `onError` was called, the argument is an `Error` instance, its `.cause` is the original rejection, and the caller's `catch` receives the original rejection unchanged
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Change the `instanceof Error` guard in the `catch` block to call `onError` for every rejection value
- [ ] When the caught value is not already an `Error`, wrap it in `new Error('non-Error rejection', {cause: value})` before passing to `onError`
- [ ] Confirm the re-thrown value is the original (`throw error`, not the wrapper) so callers see no change
- [ ] Replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` with the new guarantee and add a `([validated by ...])` traceability parenthetical
- [ ] Add a CHANGELOG entry for existing consumers of `onError`

## Out of scope

- `beforeSession` escaping the `try` block (its own issue)
- Usage accounting across tool rounds (HALEngine#93)
- Any behaviour the existing tests already pin for `Error` rejections