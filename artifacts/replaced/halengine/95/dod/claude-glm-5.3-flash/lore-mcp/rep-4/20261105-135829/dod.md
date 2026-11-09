# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` takes a pluggable `AIProvider` and `OrchestratorHooks.onError`, so the acceptance tests drive the real `processMessage` entry point with a provider whose stream rejects with a raw string, a plain object, `undefined`, and an `Error`, and fail today on the behaviour itself (`onError` sees 0 calls while the caller still receives the rejection). Run them with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.onError.acceptance.test.ts`.

## Done when these pass

- [ ] **calls onError once for a string rejection, wrapping it as the cause and rethrowing the string unchanged** — a provider rejecting with a string gives `onError` exactly one call, an `Error` whose `cause` is that string (identity, not a copy), and the caller catches the string itself. RED today
      `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`
- [ ] **calls onError once for a plain-object rejection, keeping that object as the cause and rethrowing it unchanged** — same guarantee for a plain object; `causeIsRejection`/`callerReceivedRejection` pin identity where `toEqual` would accept a clone. RED today
      `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`
- [ ] **calls onError for an undefined rejection and still rejects the caller with undefined** — the undefined rejection is not dropped from the hook either, and the caller still sees `undefined` (`rejectionOf` fails the test if the call resolves instead). RED today
      `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`
- [ ] **reaches onError as the same Error instance, not a wrapper, and still rejects the caller with that instance** — criterion 3 of the ticket. GREEN today, and it is the guard the ticket assigns to "the existing tests remaining unedited": those tests pin only the error's message, so without this test a wrap-everything implementation passes the whole suite while breaking the guarantee
      `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts`'s `catch`, drop the `error instanceof Error` gate: `hooks.onError` is awaited for every rejection, and a rejection that is not already an `Error` is passed to the hook wrapped in one with the original as `cause`.
- [ ] The `catch` still ends in `throw error` — the value at the caller boundary stays exactly what it is today, for wrapped and unwrapped rejections alike.
- [ ] `src/orchestration/chatOrchestrator.test.ts` stays unedited and green — per the ticket, it is the pin for criterion 3 (an `Error` rejection reaches `onError` unwrapped). Its tests assert the `Error` path at message level, not instance level; the instance identity is pinned by the fourth acceptance test instead, so keep the wrap strictly to non-`Error` rejections.
- [ ] `CHANGELOG.md` gains an `Unreleased`/`Fixed` entry saying what changes for an existing consumer: `onError` now fires for rejections it never saw before, and for a non-`Error` rejection it receives a wrapper `Error` whose `cause` carries the original.
- [ ] The spec's `## Error reporting` section (already rewritten by this pod, citations included) now names behaviour the code must keep.

## Out of scope

- `beforeSession` escaping the `try` — its own issue, per the ticket.
- Usage accounting across tool rounds — HALEngine#93.
- The other two `instanceof Error` sites in the same file: `consultPolicy`'s log line and `saveSession`'s error message. Neither gates `onError`; this ticket's claim is only about the hook.