# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage(session)` exposes the failing lifecycle directly. Real hooks allocate and release a session resource; a real Bedrock provider is constructed but setup fails before any provider request.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — pins rejection identity, original session/error arguments, awaited error and cleanup hooks in order, released partial allocation, and no user-input processing after failed setup.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Bring `beforeSession` into the existing error and cleanup boundary so the acceptance test passes.
- [ ] Preserve successful-session behaviour and leave existing lifecycle tests unedited.
- [ ] Retain the spec's explicit unconditional-cleanup contract and add a CHANGELOG entry describing the newly invoked error and cleanup hooks for existing consumers.
- [ ] Pass CI's build, tests, typecheck, ESLint and formatting checks.

## Out of scope

- The `instanceof Error` gate and errors thrown by error/cleanup hooks.
- Usage accounting across tool rounds (#93).
- A new hook argument or allocation-status API: deployers track their own partial allocations.
- Lore descriptor tooling currently emits only id/name/file; the test stamps its spec anchor in a comment and the spec links the declaration directly.