# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The seam exists: `createChatOrchestrator` takes `hooks` and `processMessage` is the real entry point, so both acceptance tests call it today and fail on the missing `onError` and `afterSession` behaviour. The rejection reaching the caller already holds and is asserted, so it stays green.

## Done when these pass

- [ ] **runs onError with the beforeSession error** — a `beforeSession` that throws invokes `onError` with that same error, and the caller still receives the rejection
      `src/orchestration/chatOrchestrator.beforeSessionThrow.acceptance.test.ts`
- [ ] **runs afterSession after the beforeSession throw** — a `beforeSession` that throws still runs `afterSession`
      `src/orchestration/chatOrchestrator.beforeSessionThrow.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `processMessageStream` so a throw reaches the `catch` and `finally`
- [ ] Decide and record in `specs/hal-engine-config-hooks/spec.md` what a hook can assume about how much of the turn happened when `afterSession` runs after a failed `beforeSession`
- [ ] Add the CHANGELOG entry describing the change for an existing consumer

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)
- Spec wording and CHANGELOG text are not pinned by these tests; they are reviewed, not asserted