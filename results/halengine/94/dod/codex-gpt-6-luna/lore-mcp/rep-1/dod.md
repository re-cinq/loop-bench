# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `processMessage` is the real entry point and the lifecycle hooks are observable through its configured hooks. The acceptance test makes `beforeSession` reject and checks the caller rejection plus hook arguments and order.

## Done when these pass

- [ ] **routes a beforeSession rejection through onError and afterSession, then rejects unchanged** — a failed startup hook reaches the normal error and cleanup hooks and remains the caller-visible rejection; the turn has not entered its later lifecycle hooks.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the guarded lifecycle so its rejection reaches `onError` and `afterSession`.
- [ ] Record in the spec that cleanup runs after a failed `beforeSession` and that no later turn hooks ran.

## Out of scope

- Changes to the `instanceof Error` gate, usage accounting, or unrelated lifecycle behavior.