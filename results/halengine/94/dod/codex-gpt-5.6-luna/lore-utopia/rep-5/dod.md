# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` exposes the lifecycle seam directly through `processMessage`, so the acceptance test can trigger a real `beforeSession` failure and observe the rejection and both hooks.

## Done when these pass

- [ ] **rejects while running onError and afterSession when beforeSession throws** — the original failure reaches the caller, `onError` receives that same `Error`, and `afterSession` runs afterward
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the existing `try` boundary without changing the rejection seen by the caller.
- [ ] Run `onError` with the thrown `Error`, then run `afterSession` through the existing failure cleanup path.
- [ ] Replace the measured-flaw line in the hooks spec with the new guarantee and state what `afterSession` can assume after `beforeSession` fails.
- [ ] Add the existing-consumer impact to `CHANGELOG.md`.
- [ ] Leave the non-throwing lifecycle behavior covered by the existing tests unchanged.

## Out of scope

- Non-`Error` values rejected by `beforeSession` and the separate `instanceof Error` behavior of `onError`.
- Usage accounting across tool rounds.
- Changes to the provider, transport, or session-store APIs.