# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` exercises the real lifecycle with consumer-installed hooks. The test uses the real Bedrock provider without making a request: initialization fails before model work begins.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — awaits error reporting and cleanup with the original session and error, releases a partially allocated resource, skips later turn hooks, and preserves the caller rejection.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Bring `beforeSession` into the existing error and cleanup lifecycle; make the acceptance test green without editing existing successful-session tests.
- [ ] Retain the spec's explicit attempted-turn cleanup semantics and add a consumer-facing CHANGELOG entry for the changed failure path.
- [ ] Have CI verify the unchanged existing tests, build, typecheck, lint and formatting.

## Out of scope

- Non-Error rejection handling and usage accounting across tool rounds (#93).
- New lifecycle arguments, cleanup-hook failures, and provider behaviour.