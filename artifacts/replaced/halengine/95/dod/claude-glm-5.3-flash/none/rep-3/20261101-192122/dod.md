# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A
> rejection that is not an `Error` — a thrown string, a plain object, a value
> from a library that rejects with its own shape — bypasses `onError` entirely
> while still propagating to the caller.

**Strategy: `direct`** — the seam exists. `createChatOrchestrator(...).processMessage`
is the real entry point, and a provider whose `sendMessage` generator throws is the
real path into the `catch` at `src/orchestration/chatOrchestrator.ts:150`; a
provider that throws a non-Error value is all that was missing. The acceptance
tests live in their own file, `chatOrchestrator.acceptance.test.ts`, and the spec's
recorded-flaw line is already replaced by the new guarantee, citing them.

## Done when these pass

- [ ] **wraps a non-Error rejection in an Error whose cause is the original and
      still rejects the caller with the original** — a provider rejecting with a
      string, a plain object, and `undefined` each calls `onError` exactly once with
      an `Error` whose `cause` is that value, while the caller still receives the
      original rejection unchanged (acceptance criteria 1 and 2)
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **passes an Error rejection to onError as the same instance, not a
      wrapper** — criterion 3's guard. It is green today and must stay green through
      the fix: the existing tests only read `error.message`, so a wrapper carrying
      the same message would slip past them unedited
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Red: the first test reads `onErrorCallCount: 0` / `isError: false` /
      `causeIsOriginal: false` for string, object and undefined, because the `catch`
      skips `onError` unless `error instanceof Error`; `callerReceivedOriginal` is
      already `true`, so the only absent behaviour is the hook call.
- [ ] Green: in the `catch`, when `hooks?.onError` is set, pass it
      `error instanceof Error ? error : new Error(String(error), {cause: error})`;
      keep `throw error` re-throwing the original value so the caller boundary is
      unchanged.
- [ ] Refactor: the existing `onError` and lifecycle-order tests in
      `src/orchestration/chatOrchestrator.test.ts` stay green unedited.
- [ ] Doc (implementer): CHANGELOG entry saying what changes for an existing
      consumer — a hook typed against `Error` now fires for rejections it previously
      never saw; the caller-boundary value is unchanged. The spec guarantee is
      already recorded in `specs/hal-engine-config-hooks/spec.md` and cites the
      acceptance tests, so only the CHANGELOG line remains.

## Out of scope

- `beforeSession` escaping the `try` (its own issue, #94).
- Usage accounting across tool rounds (HALEngine#93).
- The re-thrown value at the caller boundary — it stays exactly what it is today.