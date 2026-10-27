# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` is the real lifecycle seam, with injectable hooks and a callable `processMessage` entry point. The acceptance test drives that entry point with a throwing `beforeSession` and observes the rejection and both cleanup hooks.

## Done when these pass

- [ ] **rethrows a beforeSession failure after onError and afterSession run** — a throwing `beforeSession` preserves the original rejection, invokes `onError` with the same session and error, and invokes `afterSession` afterward
      `src/orchestration/beforeSession.acceptance.test.ts`

## Facets

- [ ] Add the throwing `beforeSession` path to the existing `try`/`catch`/`finally` lifecycle.
- [ ] Preserve the original rejection while running `onError` and `afterSession` with the documented session state.
- [ ] Replace the recorded flaw in the config-hooks spec and document the consumer-visible lifecycle change in the changelog.

## Out of scope

- The `instanceof Error` gate on `onError`.
- Usage accounting across tool rounds.
- Changes to the already-covered non-throwing lifecycle.