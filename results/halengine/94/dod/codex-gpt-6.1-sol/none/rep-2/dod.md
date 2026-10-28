# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — Call the real orchestrator through `processMessage`, which consumes its streaming entry point. Real lifecycle callbacks allocate and release a resource; the production Bedrock provider is constructed but never reached on this failure path.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — Pins original rejection identity, original session/error hook arguments, error-before-cleanup order, cleanup of partial initialization, and absence of later turn hooks.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move session initialization into the existing error and cleanup boundary so the acceptance test passes.
- [ ] Preserve non-throwing hook behaviour with the existing tests unedited.
- [ ] Retain the spec guarantee that cleanup must tolerate partial initialization and track its own allocations.
- [ ] Add a CHANGELOG entry explaining error reporting and cleanup after failed initialization for existing consumers.

## Out of scope

- Non-Error throws and the `instanceof Error` gate.
- Usage accounting across tool rounds (#93).
- Changes to successful-session behaviour or hook signatures.