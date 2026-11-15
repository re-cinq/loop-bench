# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The seam exists: `createChatOrchestrator(...).processMessage` with a provider whose `sendMessage` rejects, and an `onError` hook. The test drives that real entry point, so no change of seam is needed.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is %s, and still rejects the caller with that same value** — for a string, a plain object and `undefined`, `onError` runs exactly once with an `Error` whose `cause` is the original rejection, and the caller receives that original value unchanged.
      `src/orchestration/chatOrchestrator.nonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Widen the `catch` in `processMessageStream` so `onError` runs for every rejection, wrapping a non-`Error` in `new Error(..., {cause})`.
- [ ] Re-throw the original value at the caller boundary, unchanged.
- [ ] Update `specs/hal-engine-config-hooks/spec.md`: replace the recorded-flaw bullet with the new guarantee.
- [ ] Add a CHANGELOG entry saying what changes for an existing consumer (`onError` now fires for non-`Error` rejections).

## Out of scope

- A rejection that is already an `Error` reaching `onError` as the same instance: already true and pinned by the existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts`, which must stay unedited.
- `beforeSession` escaping the `try` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).
- The spec and CHANGELOG edits are implementation work, not acceptance tests. The spec's recorded-flaw bullet carries no `validated by` link, so there is no link to add until the new guarantee statement exists.