# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` drives the real streaming lifecycle with deployer-installed hooks. One acceptance test observes the unchanged rejection, error-hook arguments, and awaited cleanup of a partially initialized session without doubles.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — original error and session identities, onError then afterSession before caller rejection, released allocation, and no user-input or model processing after setup fails.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move beforeSession into the existing lifecycle try so its Error reaches onError and finally; make the acceptance test green without editing existing tests.
- [ ] Preserve the spec's failed-initialization guarantee: afterSession handles partial setup, with deployer-owned allocation state and no new startup-status argument.
- [ ] Add a consumer-facing CHANGELOG entry explaining error notification and cleanup now run when beforeSession fails.
- [ ] Let CI verify the unchanged successful-session tests and the build, typecheck, lint, and formatting gates.

## Out of scope

- Non-Error rejection handling, errors thrown by cleanup or error hooks, and usage accounting across tool rounds (#93).
- Other unlinked measured semantics in the parent spec are explicitly outside #94.