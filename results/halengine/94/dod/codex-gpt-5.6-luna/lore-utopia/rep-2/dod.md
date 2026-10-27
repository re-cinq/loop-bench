# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` exposes the real lifecycle seam through `processMessage`, so the acceptance test invokes the orchestrator directly with real session and hook values.

## Done when these pass

- [ ] **runs onError then afterSession when beforeSession throws, and preserves the rejection** — a thrown `beforeSession` error reaches the caller unchanged, invokes `onError` with the same session and error, then invokes `afterSession`; no later lifecycle hook or provider round runs.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the existing `try` so its failure uses the ordinary `catch` and `finally` path.
- [ ] Update the config-hooks spec to guarantee `onError` then `afterSession` on this failure and state that no later turn work has happened.
- [ ] Add the existing-consumer migration note to `CHANGELOG.md`.
- [ ] Keep the existing non-throwing `beforeSession` tests unedited and green.

## Out of scope

- Non-`Error` values bypassing `onError`.
- Usage accounting across tool rounds.
- The repository-wide build, lint, typecheck, formatter, and full-suite gates; CI owns those checks.