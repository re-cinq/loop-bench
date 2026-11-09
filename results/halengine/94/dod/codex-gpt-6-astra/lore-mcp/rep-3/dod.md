# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` exposes the real lifecycle seam. One test installs allocating, reporting and cleanup hooks with a real Bedrock provider that initialization failure prevents from being called.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — preserves error identity, awaits ordered error reporting and cleanup with the existing argument shapes and identical session, releases a partial allocation, and never enters user-input processing.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move session initialization into the existing error and cleanup boundary until the acceptance test passes; preserve the existing successful-session tests unchanged.
- [ ] Retain the spec decision that cleanup runs after partial initialization and deployers track allocations themselves; add a consumer-facing CHANGELOG entry explaining the newly invoked hooks.
- [ ] Let CI verify the existing suite, build, type checks, lint and formatting.

## Out of scope

- Non-Error rejection handling, usage accounting across tool rounds (#93), and errors thrown by cleanup or error-reporting hooks.
- The other two unlinked measured semantics in the spec are explicitly separate issues, not acceptance criteria for #94.
- The current Lore list adapter emits only id, name and file, not a spec field; the test carries its spec anchor and the spec links directly to its declaration without changing production tooling.