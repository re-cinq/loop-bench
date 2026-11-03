# Definition of Done

> Call onError for a rejection that is not an Error

**Strategy: `direct`** — The orchestrator's `catch` handler already exists and has a seam (the `onError` hook). The acceptance tests call `processMessage` directly and observe whether `onError` is invoked with the right value when the provider rejects with non-Error values.

## Done when these pass

- [ ] **calls onError with an Error whose cause is a string rejection, and caller receives original string** — Wraps a string rejection in an Error, passes the Error to onError with the string as cause, and re-throws the original string to the caller
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError with an Error whose cause is a plain object rejection, and caller receives original object** — Wraps a plain object rejection in an Error, passes the Error to onError with the object as cause, and re-throws the original object
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError with an Error whose cause is undefined rejection, and caller receives undefined** — Wraps an undefined rejection in an Error, passes the Error to onError with undefined as cause, and re-throws undefined to the caller
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **passes an Error rejection unchanged to onError, not wrapped** — A rejection that is already an Error is passed to onError as the same instance, not wrapped
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Modify the `catch` block in `chatOrchestrator.ts` to wrap non-Error rejections in an Error with the rejection as `cause`
- [ ] Ensure the re-thrown value at the caller boundary remains exactly what was originally thrown
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to replace the measured-semantics line with the new guarantee
- [ ] Update CHANGELOG to document the change for existing consumers

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)