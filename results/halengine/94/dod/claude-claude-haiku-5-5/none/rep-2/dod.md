# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The seam exists: `createChatOrchestrator` and `processMessage` are the real entry points, and the hook calls are already observable through `OrchestratorHooks`. No new seam is needed.

The red bar for these tests is shown by the Jest run in this pod (see the final message). CI's job that runs them is the `Test` step of `.github/workflows/ci.yml`, exposed to Lore as `hal-engine-jest`.

## Done when these pass

- [ ] **reaches onError with the thrown Error for the same session, and the caller still gets that rejection** — a throwing `beforeSession` hands `onError` the same session object and the thrown Error, and the caller's rejection is unchanged
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **still runs afterSession, so a hook that releases what beforeSession allocated is not skipped** — a throwing `beforeSession` still reaches `afterSession`, the decision recorded for this ticket
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `processMessageStream` so its throw reaches `catch` (`onError`) and `finally` (`afterSession`, session save)
- [ ] Keep the rejection the caller sees identical to today (the `throw error` in `catch` already does this)
- [ ] Record in `specs/hal-engine-config-hooks/spec.md`: `afterSession` runs after a failed `beforeSession`, and the hook cannot tell from `session` alone whether the turn started, so a deployer must treat `afterSession` as "release if allocated"; replace the recorded-flaw line with this guarantee
- [ ] Add the CHANGELOG entry: an existing consumer's `afterSession` and `onError` now fire when `beforeSession` throws

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue; a thrown non-Error still bypasses `onError`)
- Usage accounting across tool rounds (HALEngine#93)
- Spec link (`validated by`) for the new guarantee: the statement does not exist until the spec is rewritten in the implementation round