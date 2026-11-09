# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` drives the real lifecycle, using the shipped local provider and real hooks. One test observes error identity, hook arguments and order, partial-resource cleanup, and the absence of user-input/model work.

## Done when these pass

- [ ] **reports a beforeSession failure and cleans up before rejecting with the original error** — startup failure reaches both lifecycle hooks with the original session, releases a partially acquired resource, and rejects with the same error.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the existing error/cleanup boundary and make the acceptance test green.
- [ ] Preserve existing successful-startup tests unedited.
- [ ] Review the spec guarantee: cleanup follows an attempted turn and must tolerate partial or absent allocation.
- [ ] Add a consumer-facing CHANGELOG entry explaining the newly invoked hooks after startup failure.
- [ ] Pass the required CI checks, including the existing test suite.

## Out of scope

- Non-Error rejection handling and usage accounting across tool rounds.
- Failures thrown by `onError` or `afterSession` themselves.
- The test descriptor script currently emits no `spec` field; the test carries its spec anchor and the spec carries the validating link, without changing production/tooling code in this test-only ticket.