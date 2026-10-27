# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage()` is the real public orchestration seam, and existing tests establish the hook and rejection conventions there.

## Done when these pass

- [ ] **rethrows the beforeSession error and runs onError before afterSession** — a `beforeSession` failure is rethrown unchanged, reaches `onError`, and still runs `afterSession` with the same session context.
      `src/orchestration/beforeSession.acceptance.test.ts`

## Facets

- [ ] Make the `beforeSession` failure enter the existing `catch`/`finally` lifecycle.
- [ ] Preserve the rejection and hook argument shape while specifying the post-failure `afterSession` assumption in the spec.
- [ ] Update the CHANGELOG for existing consumers and keep the non-throwing `beforeSession` tests unchanged.

## Out of scope

- The `instanceof Error` gate on `onError`.
- Usage accounting across tool rounds.