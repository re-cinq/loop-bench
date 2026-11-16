# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` already exposes `processMessage` and `processMessageStream` with `OrchestratorHooks`, so the acceptance tests invoke the real orchestrator directly and fail on the missing `onError` and `afterSession` invocations when `beforeSession` throws.

## Done when these pass

- [ ] **runs onError with session and error, then afterSession, and rejects when beforeSession throws** — `beforeSession` throwing an `Error` invokes `onError(session, error)`, then `afterSession(session)`, and still rejects to the caller
  `src/orchestration/beforeSessionThrow.acceptance.test.ts`
- [ ] **skips user, model, and provider phases when beforeSession throws on stream** — `beforeSession` failure on `processMessageStream` enters `onError` and `afterSession` without running `beforeUserInput`, `afterUserInput`, `beforeModelResponse`, `afterModelResponse`, or `provider.sendMessage`
  `src/orchestration/beforeSessionThrow.acceptance.test.ts`

## Facets

- [ ] Move `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block of `processMessageStream` in `src/orchestration/chatOrchestrator.ts`
- [ ] Re-verify `specs/hal-engine-config-hooks/spec.md` anchors (especially `chatOrchestrator.ts#L148` and `#L150` if line numbers shift) with `node scripts/repoint-spec-anchors.mjs` and add the `CHANGELOG.md` entry for consumers
- [ ] Run the full verification suite (`npm run verify`) and confirm existing hook tests remain green unedited

## Out of scope

- The `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts`
- Usage accounting across tool rounds (`HALEngine#93`)