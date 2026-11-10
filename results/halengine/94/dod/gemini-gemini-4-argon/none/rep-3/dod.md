# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.
>
> That breaks the guarantee the hook names imply. A deployer who allocates something in `beforeSession` — a span, a database handle, a rate-limit token — and releases it in `afterSession` leaks it on exactly the path where the allocation failed, and learns nothing from `onError` because it never fires. The failure is silent in the engine and visible only as an unexplained rejection at the caller.

**Strategy: `direct`** — `createChatOrchestrator` and `OrchestratorHooks` already expose the full lifecycle hook seam through `processMessage` and `processMessageStream`, so the acceptance test calls `orchestrator.processMessage(session)` directly with hooks installed and observes which hooks fire when `beforeSession` throws.

## Done when these pass

- [ ] **when beforeSession throws runs onError with the session and error, then afterSession, and still rejects at the caller** — When `beforeSession` throws an `Error`, `onError` receives the session and that error, `afterSession` runs after `onError` with the session, intermediate hooks (`beforeUserInput`, `afterUserInput`, `beforeModelResponse`, `afterModelResponse`) are skipped, and the error still rejects at the caller.
      `src/orchestration/beforeSessionThrow.acceptance.test.ts`

## Facets

- [ ] Move `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block in `processMessageStream` in `src/orchestration/chatOrchestrator.ts` so a throw from `beforeSession` flows through `catch` (`onError`) and `finally` (`afterSession`) before rejecting at the caller.
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to replace its recorded-flaw bullet with the new guarantee (stating what `afterSession` can assume about how much of the turn happened), add an entry under `## [Unreleased]` in `CHANGELOG.md` describing the change for existing consumers, and run `node scripts/repoint-spec-anchors.mjs` if line numbers in `src/orchestration/chatOrchestrator.ts` shift.

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue).
- Usage accounting across tool rounds (`HALEngine#93`).