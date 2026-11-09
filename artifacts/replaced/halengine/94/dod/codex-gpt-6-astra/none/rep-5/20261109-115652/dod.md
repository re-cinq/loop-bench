# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` exercises the real streaming lifecycle. A throwing consumer hook and a real Bedrock provider (never reached) expose the missing error reporting and cleanup without mocks or stubs.

## Done when these pass

- [ ] **reports and cleans up a beforeSession failure before rejecting with the original error** — initialization failure calls and awaits `onError` and `afterSession` with the original arguments, releases a partially acquired resource, skips user-input processing, and preserves the caller's rejection identity.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the existing protected lifecycle so the acceptance test passes without changing error identity or hook order.
- [ ] Preserve the non-throwing lifecycle covered by the unedited `src/config.test.ts` and `src/orchestration/chatOrchestrator.test.ts`; CI runs these existing tests.
- [ ] Keep the spec's new attempted-turn cleanup guarantee and document the consumer-visible change in CHANGELOG.md.
- [ ] Pass the ticket's build, test, typecheck, ESLint, and formatting gates in CI.

## Out of scope

- Changing the `instanceof Error` gate, hook-error precedence, usage accounting across tool rounds, or adding a session-started flag.
- The spec's two remaining recorded flaws, which the ticket explicitly excludes.
- Production changes in this acceptance-test commit.