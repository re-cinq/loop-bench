# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — the seam is `processMessage` on the orchestrator `createChatOrchestrator` already returns (a public export of `src/index.ts`). The tests install a throwing `beforeSession` through the real `OrchestratorHooks` option, drive a real `PromptBuilder` and a real provider stub that must never be reached, and observe `onError`, `afterSession` and the caller's rejection. The flaw is `await hooks.beforeSession(session)` sitting above the `try` at `src/orchestration/chatOrchestrator.ts:91`, so today both tests fail with the hooks never recorded while the rejection still arrives — exactly the reported claim.

## Done when these pass

- [ ] **runs onError and still rejects with the same error when beforeSession throws** — the throw reaches `onError` with the session and the same `Error` instance (the same argument shape as any other failure) and the caller still sees the original rejection; ticket criteria 1 and 2
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **runs afterSession after onError when beforeSession throws** — `afterSession` fires after `onError` and receives the same session: the catch-then-finally path any other failure takes, so a deployer that allocates in `beforeSession` and releases in `afterSession` sees the release run; ticket criterion 3
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `await hooks.beforeSession(session)` inside the `try` in `src/orchestration/chatOrchestrator.ts` (first statement of `processMessageStream`, above the `try`). Nothing else changes: the `catch` already rethrows and the `finally` already runs `commitStreamingEntries` → `afterSession` → `saveSession`, which is exactly the path these tests demand.
- [ ] Leave `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` hook suites unedited and green — a non-throwing `beforeSession` behaves exactly as today (ticket criterion 4).
- [ ] The spec half of criterion 5 is already done by this commit: `specs/hal-engine-config-hooks/spec.md` replaces its recorded-flaw line with the new guarantee ("Session lifecycle error path") and records the answer the criteria fix — `afterSession` runs and a hook cannot assume any of the turn happened. Refine that prose only if the implementation shows a sharper guarantee; keep both citations pointing at the acceptance tests (`node scripts/check-spec-anchor-names.mjs` after any move).
- [ ] Add the `CHANGELOG.md` entry saying what changes for an existing consumer (criterion 5's second half) — `afterSession` now runs on a turn whose `beforeSession` failed, so a hook that assumed it only sees completed turns must tolerate a never-started session.

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue): a `beforeSession` that throws a non-`Error` still bypasses `onError` under this ticket, as the spec's remaining "Measured semantics" bullet records.
- Usage accounting across tool rounds, the `lastUsage` bullet (HALEngine#93).
- Changing what `afterSession` receives or adding a "session started" flag to it — the recorded answer is that the hook cannot tell, and deployers must tolerate that.