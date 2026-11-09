# Definition of Done

> "The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller."

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` takes hooks and any `AIProvider`, so the acceptance tests drive the real `processMessage` entry point with a provider that rejects with a non-`Error` value and observe both `onError` and what the caller receives. No new seam needs building; the fix is a gate change in one `catch`.

## Done when these pass

- [ ] **hands onError a string rejection wrapped as cause and still rejects the caller with the string** — a provider rejecting with a string calls `onError` exactly once, with an `Error` whose `cause` is that string, and `processMessage` still rejects with the original string
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **hands onError a plain-object rejection wrapped as cause and still rejects the caller with that object** — the same for a plain object, with identity pinned on both the wrapper's `cause` and the caller's rejection
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **calls onError for an undefined rejection and still rejects the caller with undefined** — `onError` fires even for `undefined`, and the caller still sees `undefined`, not the wrapper
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **existing tests stay green and unedited** — a rejection that is already an `Error` reaches `onError` as the same instance, not a wrapper, and still propagates: the wrap applies only where `instanceof Error` is false
      `src/orchestration/chatOrchestrator.test.ts` (`onError > called with session and error when stream fails`, `onError > error still propagates after onError hook`, and the rest of the file unedited)

## Facets

- [ ] red: the three acceptance tests fail today with `calls: 0` — `onError` never fires for a non-`Error` rejection while the caller still receives the original value
- [ ] green: in the `catch` of `processMessageStream` (`src/orchestration/chatOrchestrator.ts:150`), call `onError` for every rejection, passing an `Error` that carries the original as its `cause` only where `!(error instanceof Error)`; an `Error` rejection keeps reaching `onError` as that same instance
- [ ] the re-thrown value stays exactly what it is today — the caller never sees the wrapper
- [ ] `specs/hal-engine-config-hooks/spec.md`: the "Measured semantics — out of scope" section was already replaced (dod commit) by the "Error rejections" guarantee citing the acceptance tests; check the statements still match the implemented behaviour after the fix
- [ ] CHANGELOG: a `### Fixed` entry under `[Unreleased]` written for an existing consumer — `onError` now also fires for rejections that are not `Error`s, hooks typed against `Error` need no change, and the raw value is reachable as the wrapper's `cause`

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- usage accounting across tool rounds (HALEngine#93)
- changing the shape of the value the caller receives, or the `OrchestratorHooks.onError` signature