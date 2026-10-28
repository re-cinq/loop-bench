# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` exposes the shared rejection handler through installed hooks. The test runs the built-in provider and rejects from a real `afterModelResponse` hook, exercising the same catch as provider failures without a provider double.

## Done when these pass

- [ ] **reports every rejection as an Error while preserving the original caller rejection** — string, object and undefined each notify once with an Error carrying the identical cause; an existing Error keeps its identity, and every caller rejection is unchanged.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Normalize non-Error rejections only for onError, preserving the original throw and existing Error identity.
- [ ] Confirm provider rejections use the same normalization; leave existing Error tests unedited.
- [ ] Retain the linked spec guarantee and add a consumer-facing CHANGELOG entry describing the newly reported failures.

## Out of scope

- beforeSession lifecycle placement and usage accounting across tool rounds (#93).
- Changes to hook failure precedence or Error message wording.