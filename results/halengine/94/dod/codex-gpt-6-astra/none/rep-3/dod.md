# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` already reaches the shared streaming lifecycle. One acceptance test installs real hooks, acquires and releases a resource, and observes the original rejection and cleanup through that entry point without doubles.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — awaits `onError` then `afterSession` with the original session/error, releases partial setup resources, skips later turn hooks, and preserves the rejection.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the existing error-handling boundary so the acceptance test passes.
- [ ] Preserve the existing successful-session tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` unedited; CI verifies them.
- [ ] Retain the spec's attempted-turn cleanup contract and add a CHANGELOG entry explaining that existing consumers now receive error and cleanup hooks when setup fails.
- [ ] Let CI run the full build, test, typecheck, ESLint and formatting checks.

## Out of scope

- Non-`Error` rejections, errors thrown by cleanup/error hooks, and usage accounting across tool rounds (#93).
- Adding a session-started flag or changing hook signatures.
- Other unlinked measured semantics in the shared spec, which the ticket explicitly excludes.
- Changing Lore descriptor tooling: this checkout's list command emits only `id`, `name`, and `file`; the test carries its spec anchor as a comment and the spec links directly to its declaration.