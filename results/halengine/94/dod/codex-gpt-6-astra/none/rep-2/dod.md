# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` exercises the real streaming lifecycle through installed hooks. The acceptance test uses a real Bedrock provider (never reached on this path), a real prompt builder, and resource-owning hooks without mocks or stubs.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — both hooks are awaited in order with the original session and error, partial initialization is cleaned up, later user-input processing does not run, and the caller receives the identical rejection.
      `src/orchestration/beforeSession.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the existing error-handling boundary and make the acceptance test green without editing existing success-path tests.
- [ ] Preserve the spec decision: cleanup runs after failed initialization, has no new started flag, and must handle partially acquired resources.
- [ ] Add a consumer-facing CHANGELOG entry describing the additional error and cleanup callbacks after initialization failure.
- [ ] Let CI confirm the unchanged existing tests and required build, typecheck, ESLint and formatting checks.

## Out of scope

- Non-Error rejection handling and usage accounting across tool rounds (#93).
- New hook arguments, guarantees when error/cleanup hooks themselves throw, and changes to successful turns.
- The current Lore listing script emits only id, name and file; it has no spec descriptor support. The test carries its spec anchor as a comment and the spec carries the explicit validating link; changing that tooling is outside this ticket.