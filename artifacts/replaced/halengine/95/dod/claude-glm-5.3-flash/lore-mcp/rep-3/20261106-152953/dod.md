# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` accepts any `AIProvider`, so the acceptance test installs a provider whose `sendMessage` throws a non-`Error` and observes `onError` through the real entry point, `processMessage`. No doubles needed and no production change is required to make the test runnable; it fails today because the `instanceof Error` gate in `src/orchestration/chatOrchestrator.ts` skips the hook call.

## Done when these pass

- [ ] **calls onError for a rejection that is not an Error, wrapping it with the original as its cause** — a provider rejecting with a string, with a plain object, and with `undefined` each calls `onError` exactly once with an `Error` whose `cause` is the very value thrown, while the caller is still rejected with the original value unchanged; a rejection that is already an `Error` reaches the hook as that same instance, not a wrapper
  `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`

  The already-an-`Error` half is also pinned by the existing tests, which this ticket leaves unedited and which CI keeps green:
  `src/orchestration/chatOrchestrator.test.ts` — "called with session and error when stream fails" and "error still propagates after onError hook".

## Facets

- [ ] In the `catch` of `processMessageStream`, drop the `error instanceof Error` gate: pass `onError` the error as-is when it is an `Error`, otherwise wrap it in an `Error` carrying the original as `cause`; the re-thrown value at the caller boundary stays exactly what it is today
- [ ] Spec statement and citation are already in place from this commit: `specs/hal-engine-config-hooks/spec.md` § "onError for every rejection" replaces the recorded-flaw line and cites the acceptance test — nothing owed there beyond keeping the citation true
- [ ] CHANGELOG entry under **Fixed** (Unreleased) saying what changes for an existing consumer whose `onError` now also sees wrapped non-`Error` rejections
- [ ] CI green on the branch: `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint` (`--max-warnings 0`), `npm run prettier:check`

## Out of scope

- `beforeSession` escaping the `try` — its own issue
- Usage accounting across tool rounds — HALEngine#93