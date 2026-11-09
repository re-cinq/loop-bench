# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` exposes buffered and streaming entry points with real lifecycle hooks. One acceptance test exercises both using the shipped mock provider, without test doubles.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting the caller with the original error** — pins error identity, hook arguments and order, partial-start cleanup, and absence of subsequent turn processing for both entry points.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Put `beforeSession` inside the existing error-handling boundary so the acceptance test passes.
- [ ] Keep the existing success-path tests unedited and passing in CI.
- [ ] Retain the spec guarantee that cleanup runs after partial startup and must tolerate resources never allocated.
- [ ] Add a CHANGELOG entry explaining that existing consumers now receive error and cleanup callbacks when startup fails.
- [ ] Pass the ticket's build, tests, typecheck, eslint and formatting checks in CI.

## Out of scope

- Changing the `instanceof Error` gate, usage accounting across tool rounds, or behaviour when error/cleanup hooks themselves throw.
- Other measured semantics explicitly excluded by this ticket.