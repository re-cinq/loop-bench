# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` in `src/orchestration/chatOrchestrator.ts` already accepts `OrchestratorHooks` (`beforeSession`, `onError`, `afterSession`) and drives the turn through `processMessage`/`processMessageStream`. The acceptance test invokes that real entry point directly and fails today only because `beforeSession` is awaited above the `try` block.

## Done when these pass

- [ ] **runs onError then afterSession when beforeSession throws, without running the turn, and rejects with the same error** — pins that a throw from `beforeSession` still rejects the caller with the same error, calls `onError(session, error)` then `afterSession(session)`, and runs no downstream hooks or provider call
  `src/orchestration/beforeSessionThrows.acceptance.test.ts`

## Facets

- [ ] Move `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block in `src/orchestration/chatOrchestrator.ts` so throws from `beforeSession` reach `catch` and `finally` and turn `beforeSessionThrows.acceptance.test.ts` green
- [ ] Verify existing `beforeSession` and lifecycle tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` pass unedited
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to remove the obsolete `beforeSession` flaw bullet from `Measured semantics — out of scope` (updating the intro count from three properties to two) and confirm the guarantee states what `afterSession` can assume about how much of the turn happened
- [ ] Add an entry under `## [Unreleased]` in `CHANGELOG.md` describing the behaviour change for consumers whose `beforeSession` throws
- [ ] Run `npm run verify` (`typecheck`, `typecheck:example`, `eslint`, `prettier:check`, `test:coverage`, `build`, `spec:names`, `check:spec-links`, `check:spec-status`, `repoint-spec-anchors`)

## Out of scope

- The `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts`
- `afterModelResponse` usage accounting across tool rounds (HALEngine#93)
- Changing the `afterSession` signature `(session: ChatSession) => Promise<void>`