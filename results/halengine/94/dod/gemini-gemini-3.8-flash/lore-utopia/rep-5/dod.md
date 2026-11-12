# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — A seam already exists through `createChatOrchestrator` options (`hooks`), so the acceptance test invokes `orchestrator.processMessage` with a throwing `beforeSession` hook and asserts that `onError` and `afterSession` execute in order before the rejection propagates to the caller.

## Done when these pass

- [ ] **runs onError then afterSession when beforeSession throws, and still rejects to the caller** — When `beforeSession` throws, `onError` is called with the error and session, `afterSession` is called afterwards with the session, and the error rejection still reaches the caller.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` block in `src/orchestration/chatOrchestrator.ts` so a throw reaches `catch` and `finally`.
- [ ] Existing `beforeSession` tests in `src/orchestration/chatOrchestrator.test.ts` and lifecycle order tests in `src/config.test.ts` stay green unedited.
- [ ] In `specs/hal-engine-config-hooks/spec.md`, replace the recorded flaw with the new guarantee stating `onError` and `afterSession` run and specifying what entries the hook observes.
- [ ] In `CHANGELOG.md`, document under `[Unreleased]` that `onError` and `afterSession` now run when `beforeSession` throws and note that `afterSession` can inspect entries to detect this case.

## Out of scope

- Gating `onError` on `error instanceof Error` (handled by issue #95).
- Usage accounting across tool rounds (HALEngine#93).