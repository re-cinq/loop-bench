# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator(...).processMessage(session)` is the real entry point, hooks are a constructor option, and the failing behaviour is observable today as a rejection that skips both hooks. No replacement module and no characterization pass are needed; the production change is moving one call inside the `try`.

## Done when these pass

- [ ] **runs onError and afterSession when beforeSession throws, and still rejects the caller** — a `beforeSession` that throws still rejects `processMessage` with the same error, and the turn now reaches `onError` (handed that very error instance and the session — the same argument shape as any other failure) and then `afterSession` (handed the session exactly as it entered the turn: no provider call was made, no user-input hook ran, the entries are untouched)
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] Red acceptance test through `processMessage`; it fails today with `callOrder: ['beforeSession']` — neither hook runs, which is the ticket's claim verbatim
- [x] `specs/hal-engine-config-hooks/spec.md` replaces its recorded-flaw bullet with the new guarantee, stating what an `afterSession` hook may assume on this path
- [ ] Move the `beforeSession` call in `processMessageStream` (`src/orchestration/chatOrchestrator.ts`) from above the `try` to inside it, so the throw reaches the existing `catch` (`onError`) and `finally` (`afterSession`). Note the consequence the `finally` already carries: `saveSession` runs on the same path, so a configured session store now also receives `save` for a turn whose `beforeSession` threw — consistent with `specs/hal-engine-session-write-signal/spec.md`, which ties `save` to the path that runs `afterSession`, not to turn success
- [ ] CHANGELOG: a `### Fixed` entry under `[Unreleased]` saying what changes for an existing consumer — `afterSession` now also fires when `beforeSession` throws, and can tell the case by the untouched session
- [ ] Green: the acceptance test passes, and the non-throwing `beforeSession` path is unchanged — pinned by the unedited `fires the lifecycle hooks in documented order for a session that completes without error` in `src/config.test.ts` and `called before anything else` / `error path calls onError then afterSession` in `src/orchestration/chatOrchestrator.test.ts` (34 tests, green today; safe to run — they are not under "Done when these pass")

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue): a rejection from `beforeSession` that is not an `Error` still bypasses `onError` while propagating to the caller
- Usage accounting across tool rounds (HALEngine#93)
- Any change to the non-throwing `beforeSession` path, the hook signatures, or the order `onError` → `afterSession`