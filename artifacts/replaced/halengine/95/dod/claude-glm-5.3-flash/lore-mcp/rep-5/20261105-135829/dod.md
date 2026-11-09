# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` with a provider whose `sendMessage` rejects drives the real `try`/`catch`/`finally` in `processMessageStream`, so the acceptance tests call the real entry point and fail today only because the `instanceof Error` gate drops the `onError` call. The other criterion — an `Error` rejection reaching the hook as the same instance — is behaviour present today, so its test passes now and guards the fix against wrapping everything.

## Done when these pass

- [ ] **reports a rejection that is not an Error to onError — a string, a plain object, undefined — as an Error whose cause is the original, while the caller still receives the original rejection** — one real turn per rejection value; each must call `onError` exactly once with an `Error` whose `cause` is the original value (instance identity), and the caller must still be rejected with the original value itself. Today all three report `onErrorCalls: 0`: the gate silently drops the hook call.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **passes a rejection that is already an Error to onError as the same instance, not a wrapper, and rejects the caller with it unchanged** — green today; pinned so the fix cannot be implemented as wrapping every rejection and rethrowing the wrapper. The existing tests that pin the `Error` path stay unedited and green: `called with session and error when stream fails`, `error path calls onError then afterSession`, `error still propagates after onError hook` in `src/orchestration/chatOrchestrator.test.ts`.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

Run them with:
`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Remove the `instanceof Error` gate from the `catch` in `src/orchestration/chatOrchestrator.ts` (`processMessageStream`): call `onError` for every rejection, wrapping whatever is not already an `Error` in one with the original as `cause`, and rethrow the ORIGINAL value unchanged — the wrapper is for the hook only.
- [ ] `specs/hal-engine-config-hooks/spec.md` replaces its recorded-flaw section with the new guarantee — done by this commit; the two `([validated by …])` citations must keep resolving if the wording is refined.
- [ ] Add a `CHANGELOG.md` `## [Unreleased] → ### Fixed` entry saying what changes for an existing consumer (an `onError` that only ever saw `Error`s now also sees wrappers carrying the raw value as `cause`). Required, not optional: `scripts/check-changelog.sh` fails CI when shipped `src/` changes without a changelog entry.
- [ ] CI green: `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint` (`--max-warnings 0`) and `npm run prettier:check` — ticket criterion 5, judged by the `verify` job in `.github/workflows/ci.yml` on every push.

## Out of scope

- `beforeSession` escaping the `try` (its own issue, per the ticket's tech notes).
- Usage accounting across tool rounds (HALEngine#93).
- Reshaping what the caller receives: the re-thrown value stays exactly what it is today.