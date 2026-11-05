# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` with a rejecting provider and an `onError` hook is the real entry point; no seam is missing.

## Done when these pass

- [ ] **calls onError once with an Error caused by a string / a plain object / undefined, and the caller receives the original** — `onError` fires exactly once with an `Error` whose `cause` is the raw rejection, and `processMessage` still rejects with the untouched original value.
  `src/orchestration/chatOrchestratorOnError.acceptance.test.ts`

## Facets

- [ ] Replace the `instanceof Error` gate in `chatOrchestrator.ts` with a wrap (`new Error(..., {cause})`) for non-Errors; rethrow the original.
- [ ] Existing `Error` rejection tests stay unedited and green (same instance reaches `onError`).
- [ ] Replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` with the new guarantee, linked to the acceptance test; add a CHANGELOG entry.

## Out of scope

- `beforeSession` escaping the `try`; usage accounting across tool rounds (HALEngine#93).