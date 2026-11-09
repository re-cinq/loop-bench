# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The public orchestrator methods accept real lifecycle hooks. One test exercises both entry points with the shipped mock provider and a partially allocating initialization hook; no test doubles are needed.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — Both entry points await error reporting and cleanup with the original session/error, skip subsequent processing, release a partial allocation, and preserve rejection identity.
      `src/orchestration/beforeSession.acceptance.test.ts`

## Facets

- [ ] Move initialization into the existing error-handling lifecycle so the acceptance test passes.
- [ ] Preserve existing successful-session tests unedited and run them in CI.
- [ ] Retain the spec's explicit partial-initialization cleanup contract and add a consumer-facing CHANGELOG entry describing the newly invoked hooks.
- [ ] Pass the ticket's build, test, typecheck, eslint and formatting gates in CI.

## Out of scope

- Non-Error rejection handling and usage accounting across tool rounds.
- Changes to hook signatures or additional initialization-status arguments.
- The spec's two remaining measured-semantics limitations belong to separate tickets.