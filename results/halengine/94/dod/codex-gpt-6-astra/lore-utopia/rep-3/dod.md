# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — Call the real orchestrator through `processMessage` with throwing setup and resource-owning lifecycle callbacks. The shipped mock provider and real prompt builder supply dependencies without test doubles; execution must stop before reaching the provider.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — Pins unchanged rejection identity, awaited error reporting with the existing argument shape, cleanup after partial allocation, and no continuation into turn processing.
      `src/orchestration/beforeSession.acceptance.test.ts`

## Facets

- [ ] Move setup into the existing error/cleanup boundary and turn the acceptance test green.
- [ ] Preserve the existing success-path tests unedited, including `calls all hooks in correct order` in `src/orchestration/chatOrchestrator.test.ts`.
- [ ] Implement the linked spec guarantee: cleanup runs even after incomplete setup; deployers track their own acquired resources without a new hook argument.
- [ ] Add a consumer-facing CHANGELOG entry describing newly invoked error and cleanup hooks after setup failure.
- [ ] Pass the ticket's build, tests, typecheck, ESLint and formatting checks in CI.

## Out of scope

- Non-Error rejection handling, failures thrown by error/cleanup hooks, and usage accounting across tool rounds (#93).
- Descriptor tooling changes: `.lore/test-commands.yml` uses `scripts/lore-list-tests.mjs`, which emits only id/name/file, with no spec field support. The test carries its spec anchor and the statement links directly to its declaration.