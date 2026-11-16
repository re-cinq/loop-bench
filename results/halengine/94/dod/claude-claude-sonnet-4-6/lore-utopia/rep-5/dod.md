# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` accepts an `OrchestratorHooks` object, and both `onError` and `afterSession` are observable via injected functions. The tests call the real entry point and check whether those hooks fire when `beforeSession` throws.

## Done when these pass

- [ ] **fires onError when beforeSession throws** — `onError` receives the same error that `beforeSession` threw, with the same argument shape as any other orchestrator failure
  `src/orchestration/chatOrchestratorBeforeSessionHooks.acceptance.test.ts`

- [ ] **fires afterSession when beforeSession throws** — `afterSession` is called even when `beforeSession` has already thrown
  `src/orchestration/chatOrchestratorBeforeSessionHooks.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call from line 91 (before the `try`) to inside the `try` block in `src/orchestration/chatOrchestrator.ts`
- [ ] Decide and record in the spec whether `afterSession` can tell "never allocated" from "allocated and finished" — the ticket asks for an explicit answer in `specs/hal-engine-config-hooks/spec.md`
- [ ] Replace the recorded-flaw bullet in `specs/hal-engine-config-hooks/spec.md` with the new guarantee and add spec test citations pointing at these acceptance tests
- [ ] Add a CHANGELOG entry describing what changes for an existing consumer

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue, noted in ticket tech notes)
- Usage accounting across tool rounds (HALEngine#93)
- Any change to the `afterSession` call site in the `finally` block — it already fires for errors inside the `try`