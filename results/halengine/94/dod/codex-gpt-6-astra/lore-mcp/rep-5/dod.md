# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — Call the existing `createChatOrchestrator().processMessage()` entry point with a rejecting initialization hook and real cleanup callbacks. A real Bedrock provider is constructed but never reached; no network, mocks, or stubs are needed.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — Both hooks are awaited in order with the original session/error, partial allocations are released, the caller receives the identical error, and user-input processing never starts.
      `src/orchestration/beforeSession.acceptance.test.ts`

## Facets

- [ ] Move initialization into the existing error/cleanup boundary to make the acceptance test green without changing successful turns or existing tests.
- [ ] Preserve the spec's cleanup decision: initialization may be partial, and cleanup must track which resources were acquired; no new hook argument is required.
- [ ] Add a consumer-facing CHANGELOG entry explaining that initialization failures now invoke error and cleanup hooks.
- [ ] Let CI verify the unchanged success-path tests and the full build, typecheck, lint, and formatting gates.

## Out of scope

- Non-Error rejection handling and usage aggregation across tool rounds (#93).
- New lifecycle arguments, hook-error precedence, and persistence semantics.
- Test-discovery tooling changes: the current `.lore/test-commands.yml` adapter emits only id/name/file, not a spec field. The acceptance test carries an explicit `@spec` anchor and the statement links directly to its declaration.