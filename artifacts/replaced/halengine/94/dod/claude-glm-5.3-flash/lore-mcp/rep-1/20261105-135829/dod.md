# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator(...).processMessage(session)` is the real entry point the HTTP route calls, and the failure is observable directly through it. The acceptance test installs a `beforeSession` that throws and asserts the same failure path a provider failure takes; today it is red because the call at `src/orchestration/chatOrchestrator.ts:91` sits above the `try`, so `onError` and `afterSession` never fire.

## Done when these pass

- [ ] **runs the same failure path as any other turn failure when beforeSession throws** — a `beforeSession` that throws still rejects to the caller unchanged, fires `onError` with the session and that error, then fires `afterSession`, with no other hook, provider call or entry commit in between
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts`, so the throw reaches the existing `catch` and `finally` (green bar)
- [ ] Keep the spec's new `## Failed sessions` statement true as written: `afterSession` runs after a failed `beforeSession`, and a hook can assume no input hook ran, no provider call was made and no entry was committed — that is the recorded answer to the ticket's open question, so no `session-started` flag is added
- [ ] `CHANGELOG.md` gains an `[Unreleased]` **Changed** entry: what changes for an existing consumer (a deployer's `afterSession` now also runs — and the session is persisted by the same `finally` path — on a turn whose `beforeSession` failed, where previously both were skipped)
- [ ] Existing hook tests stay unedited and green, pinning criterion 4 (a non-throwing `beforeSession` behaves exactly as today): `src/orchestration/chatOrchestrator.test.ts` and the hook tests in `src/config.test.ts`
- [ ] CI job **Verify** (`.github/workflows/ci.yml`) is green — typecheck, eslint `--max-warnings 0`, prettier:check, test:coverage, build

## Out of scope

- The `instanceof Error` gate on `onError` in the same `catch` — its own issue; it stays the second recorded bullet under `Measured semantics — out of scope`
- Usage accounting across tool rounds (`lastUsage` not a sum) — HALEngine#93
- Any change to hook signatures, hook arguments, or the fire order for a session that does not fail in `beforeSession`