# Definition of Done

> A rejection that is not an `Error` bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The seam exists: `createChatOrchestrator` takes the `onError` hook and a provider that rejects with an arbitrary value, so the acceptance tests call the real entry point. The gate `error instanceof Error` in the `catch` of `processMessageStream` (`src/orchestration/chatOrchestrator.ts`) is the missing behaviour.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is a thrown string, and rejects the caller with that string** — a provider rejecting with a string reaches `onError` once as an `Error` wrapping it as `cause`, and the caller receives the original string.
      `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`
- [ ] **calls onError once with an Error wrapping a plain object, and rejects the caller with the original value** — same guarantee for a plain-object rejection.
      `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`
- [ ] **calls onError once with an Error wrapping undefined, and rejects the caller with the original value** — same guarantee for an `undefined` rejection.
      `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`

## Facets

- [ ] Wrap a non-`Error` rejection in an `Error` with `cause` set to the original value, and pass that to `onError` in the `catch` of `processMessageStream`; re-throw the original value unchanged.
- [ ] Rejection that is already an `Error` keeps reaching `onError` as the same instance. Already true; pinned by the existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts`, which must stay unedited.
- [ ] Replace the recorded-flaw line under "Measured semantics — out of scope" in `specs/hal-engine-config-hooks/spec.md` with the new guarantee, and add a CHANGELOG entry saying what changes for an existing consumer.

## Out of scope

- `beforeSession` escaping the `try` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).
- Any change to the value the caller receives: the re-thrown rejection stays exactly as it is today.
- Spec and CHANGELOG wording: the implementation round owns those edits; this round adds tests only.