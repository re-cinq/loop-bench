# Definition of Done

> "`beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs."

**Strategy: `direct`** — the seam already exists: `processMessage` on the orchestrator `createChatOrchestrator` returns is the real entry point, and `OrchestratorHooks` is a plain object a test installs today. Both tests fail only because the behaviour is absent, not because a seam is missing.

## Done when these pass

- [ ] **runs onError and afterSession in order, then still rejects with the thrown error** — a throwing `beforeSession` reaches the caller as a rejection (unchanged from today) but first runs `onError`, then `afterSession`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **hands onError the session and the error beforeSession threw** — `onError` gets the same `(session, error)` shape as any other orchestrator failure, and `afterSession` still gets the session
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

Run them with `npm test -- --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`.

## Facets

- [x] `specs/hal-engine-config-hooks/spec.md` replaces its recorded-flaw bullet with the new guarantee, cited from the acceptance tests; `| Status |` untouched. Verified with `npm run spec:names`, `npm run check:spec-links`, `node scripts/check-spec-status.mjs` and `node scripts/repoint-spec-anchors.mjs --check origin/main`.
- [ ] Move the `beforeSession` await inside the `try` in `src/orchestration/chatOrchestrator.ts` (the call above line 93) so the throw reaches the existing `catch` and `finally`.
- [ ] Both acceptance tests green, with the existing tests in `src/orchestration/chatOrchestrator.test.ts` left UNEDITED and green — a non-throwing `beforeSession` behaves exactly as today, which those tests already pin ("called before anything else", "calls all hooks in correct order", "error path calls onError then afterSession").
- [ ] CHANGELOG: one `[Unreleased]` **Changed** bullet saying what changes for an existing consumer — `afterSession` now also runs when `beforeSession` throws, so a cleanup hook must tolerate releasing a resource that was never allocated.

## Out of scope

- The `instanceof Error` gate on `onError` — its own issue; a thrown non-`Error` from `beforeSession` still bypasses `onError` while propagating.
- Usage accounting across tool rounds (`afterModelResponse` sees per-round usage) — HALEngine#93.
- Hook order on a successful turn, and anything about the WebSocket transport.