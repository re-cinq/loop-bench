# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The public `createHalEngine` factory exposes the running orchestrator, so the failed hook path is observable through `processMessage` without a replacement seam.

## Done when these pass

- [ ] **reports a failed beforeSession then cleans up before any turn work begins** — a `beforeSession` error is rethrown unchanged, reaches `onError`, and still reaches `afterSession` before normal turn work.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the existing `try` path.
- [ ] Preserve the original rejection while calling `onError` before `afterSession`.
- [ ] Document the failed-start cleanup guarantee and the consumer-facing change in the changelog.

## Out of scope

- Non-`Error` values bypassing `onError` and usage accounting across tool rounds.