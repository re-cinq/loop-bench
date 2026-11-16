# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` is the real entry point; a provider that rejects with a non-Error value exercises the `instanceof Error` gate in the catch today.

## Done when these pass

- [ ] **calls onError once with an Error caused by a string / a plain object / undefined, and rejects with the original** — onError fires once with an `Error` whose `cause` is the raw value; the caller still receives the raw value.
      `src/orchestration/chatOrchestratorOnError.acceptance.test.ts`
- [ ] Existing `chatOrchestrator.test.ts` stays unedited and green (an `Error` reaches onError as the same instance).

## Facets

- [ ] Wrap non-Error rejections in an Error with `cause` before calling `onError`; rethrow the original.
- [ ] Replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` with the new guarantee, linking this test.
- [ ] CHANGELOG entry for existing consumers.

## Out of scope

- `beforeSession` escaping the `try`; usage accounting across tool rounds (HALEngine#93).