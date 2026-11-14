# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` already exposes `processMessage` and `processMessageStream` with `OrchestratorHooks`, so the acceptance tests invoke those entry points directly and fail today because `beforeSession` executes outside `try`/`catch`/`finally`.

## Done when these pass

- [ ] **runs onError with the error, runs afterSession, and rejects when beforeSession throws** — invokes `processMessage` with a throwing `beforeSession` and pins that `onError` receives `(session, error)`, `afterSession` receives `session`, and the caller still receives the thrown `Error` as a rejection
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

- [ ] **skips the turn and runs onError then afterSession when beforeSession throws on stream** — consumes `processMessageStream` with all lifecycle hooks installed and pins that intermediate turn steps and the provider are skipped, `onError` runs before `afterSession`, no chunks are yielded, and the stream rejects with the thrown `Error`
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move the `hooks?.beforeSession` call inside the `try` block in `src/orchestration/chatOrchestrator.ts` so a throw reaches `onError` and `afterSession` before propagating to the caller, leaving existing tests unedited.
- [ ] Re-verify `chatOrchestrator.ts` line citations in `specs/hal-engine-config-hooks/spec.md` and run `node scripts/repoint-spec-anchors.mjs` if any line numbers in `src/orchestration/chatOrchestrator.ts` shift.
- [ ] Add an entry under `## [Unreleased]` in `CHANGELOG.md` stating what changes for an existing consumer when `beforeSession` throws.

## Out of scope

- The `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts` (its own issue).
- Usage accounting across tool rounds in `afterModelResponse` (`re-cinq/HALEngine#93`).