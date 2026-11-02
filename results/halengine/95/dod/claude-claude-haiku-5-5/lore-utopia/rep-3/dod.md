# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The seam exists: `createChatOrchestrator(...).processMessage` runs the `catch` in `processMessageStream` with a real `AIProvider` whose stream rejects with the given value. The acceptance test calls that entry point today and fails on the `instanceof Error` gate.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is a string, and rejects the caller with the original value** — a string rejection reaches `onError` once as an `Error` with `cause` set to the string, and the caller still receives the same string.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **calls onError once with an Error whose cause is a plain object, and rejects the caller with the original value** — same guarantee for a plain-object rejection.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **calls onError once with an Error whose cause is undefined, and rejects the caller with the original value** — same guarantee for an `undefined` rejection.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Gate `onError` in the `catch` of `processMessageStream` on the rejection being an `Error` wrapped with `cause`, not on `instanceof Error` alone (`src/orchestration/chatOrchestrator.ts`). An `Error` rejection must still reach `onError` as the same instance: the existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts` (`called with session and error when stream fails`, `error still propagates after onError hook`) stay green and unedited.
- [ ] Keep the re-thrown value at the caller boundary exactly as it was.
- [ ] Replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` ("Measured semantics — out of scope") with the new guarantee, and give it a validated-by parenthetical pointing at the acceptance test.
- [ ] Add a CHANGELOG entry under Unreleased saying `onError` now fires for non-`Error` rejections, wrapped in an `Error` whose `cause` is the original value, and what an existing consumer must change (a hook that assumed only `Error`s will now also see wrapped values).

## Out of scope

- `beforeSession` escaping the `try` — its own issue.
- Usage accounting across tool rounds — HALEngine#93.
- Changing what the caller receives: the rejection stays the original value.
- Spec `Status` rows: untouched.