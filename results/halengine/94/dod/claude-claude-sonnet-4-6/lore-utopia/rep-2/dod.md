# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The seam already exists: `createChatOrchestrator` accepts `OrchestratorHooks` and the orchestrator exposes `processMessage`. The acceptance tests call `processMessage` with a throwing `beforeSession` hook and assert that `onError` and `afterSession` fire.

## Done when these pass

- [ ] **onError fires when beforeSession throws** — `onError` receives the thrown error when `beforeSession` rejects, with the same `Error` argument shape as any other orchestrator failure
  `src/orchestration/beforeSession-error.acceptance.test.ts`

- [ ] **afterSession fires when beforeSession throws** — `afterSession` is called even when `beforeSession` threw, so a deployer who allocates in `beforeSession` can release in `afterSession`
  `src/orchestration/beforeSession-error.acceptance.test.ts`

## Facets

- [ ] Move `hooks?.beforeSession` call from line 91 of `chatOrchestrator.ts` to inside the `try` block
- [ ] Confirm `onError` acceptance test goes green
- [ ] Confirm `afterSession` acceptance test goes green
- [ ] Update `specs/hal-engine-config-hooks/spec.md`: replace the recorded-flaw bullet in "Measured semantics — out of scope" with the new guarantee (what `afterSession` can assume about how much of the turn ran) and add `([validated by ...])` citations on both new guarantee statements
- [ ] Add CHANGELOG entry describing what changes for an existing consumer

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue per ticket)
- Usage accounting across tool rounds (HALEngine#93)
- Whether `afterSession` should receive a flag indicating the session never fully started — the ticket asks that this be decided and recorded in the spec, but the decision itself is left to the implementer