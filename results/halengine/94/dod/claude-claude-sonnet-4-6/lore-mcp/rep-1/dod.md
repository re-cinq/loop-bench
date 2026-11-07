# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` is a public seam that accepts an `OrchestratorHooks` object. A `beforeSession` hook that throws can be passed in directly, and the test observes whether `onError` and `afterSession` subsequently fire. No production changes are needed to exercise the missing behaviour.

## Done when these pass

- [ ] **onError fires with the thrown error when beforeSession throws** — `onError` receives the exact error thrown by `beforeSession`, meaning the `catch` block ran
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **afterSession fires even when beforeSession throws** — `afterSession` is called after a `beforeSession` rejection, meaning the `finally` block ran
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `hooks?.beforeSession` call from line 91 of `chatOrchestrator.ts` to inside the `try` block (after the `try {` on line 93), so a throw falls into the existing `catch`/`finally`
- [ ] Verify the `instanceof Error` gate on `onError` (line 150) passes for the `beforeSession` error — it does for plain `new Error(...)` but confirm the fix does not widen the gate
- [ ] Update the "Measured semantics" section of `specs/hal-engine-config-hooks/spec.md` to replace the recorded flaw with the new guarantee, and decide what `afterSession` can assume about how much of the turn ran (ticket acceptance criterion #3)
- [ ] Add a CHANGELOG entry describing the behaviour change for existing consumers

## Out of scope

- The `instanceof Error` gate on `onError` for non-Error rejections (its own issue, named in ticket tech notes)
- Usage accounting across tool rounds (HALEngine#93)
- Any changes to `afterUserInput`, `beforeUserInput`, `beforeModelResponse`, or `afterModelResponse` behaviour