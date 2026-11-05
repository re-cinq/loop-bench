# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` exercises the real lifecycle with installed hooks and the shipped local provider. One acceptance test pins error identity, hook arguments and order, and cleanup after partial startup without test doubles.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — the original rejection survives, error reporting and cleanup finish with the original session, and later turn hooks never run.
      `src/orchestration/beforeSession.acceptance.test.ts`

## Facets

- [ ] Move startup into the protected lifecycle so the acceptance test passes without changing successful startup or existing tests.
- [ ] Retain the specified cleanup contract: attempted startup does not imply successful allocation; hooks track their own acquired resources.
- [ ] Add a consumer-facing CHANGELOG entry describing error reporting and cleanup after failed startup, and remove the spec's temporary red-test note when implemented.
- [ ] Let CI verify the existing suite, build, typecheck, ESLint and formatting.

## Out of scope

- Non-Error rejections and usage accounting across tool rounds (#93).
- New hook arguments, cleanup-hook failures, and changes to successful-turn behaviour.
- Test-command infrastructure: the existing Lore list script emits only id, name and file; the test carries an @spec stamp and the spec has its named inline validation link.