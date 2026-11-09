# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator(provider, promptBuilder, undefined, {hooks}).processMessage(session)` is the real caller path, `hooks.onError` is the observable seam, and a provider whose `sendMessage` generator throws a non-Error drives it today. The tests fail now on `onError` never firing (`onErrorCalls: 0`) while `callerRejectionIsTheOriginal: true` shows the propagation half of the claim already holding.

## Done when these pass

- [ ] **reports a string rejection to onError once, as an Error whose cause is that string, and still rejects the caller with it** — ticket criterion 1: `onError` called once with an `Error` whose `cause` is the string, caller rejects with the string itself
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **reports a plain-object and an undefined rejection to onError the same way, and reaches an Error rejection as the same instance** — ticket criteria 2 and 3: plain object and `undefined` each wrap with the original as `cause` and the caller still gets the original; a rejection that already is an `Error` (an `AIError` subclass instance) reaches `onError` as the same instance, not a wrapper
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **existing Error-path tests stay green and unedited** — ticket criterion 3's own pin: `onError > called with session and error when stream fails`, `onError > error still propagates after onError hook`, `afterSession > called even when an error occurs`
      `src/orchestration/chatOrchestrator.test.ts`

Run exactly this (jest takes a path; the pod's Bash hook refuses a bare `npm test`):

```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts src/orchestration/chatOrchestrator.test.ts
```

## Facets

- [ ] Delete the `&& error instanceof Error` gate in the `catch` of `processMessageStream` (`src/orchestration/chatOrchestrator.ts:150`): call `onError` whenever the hook is installed, wrapping whatever is not already an `Error` in one that carries the original as `cause`.
- [ ] Leave the re-throw alone (`throw error` stays the original value): the caller boundary keeps today's shape exactly — string, plain object, `undefined` or `Error` instance.
- [ ] Do not wrap rejections that already are an `Error`: `onError` must receive the same instance, `AIError` subclass included. The second acceptance test pins the identity; the existing tests pin only the message, so a blanket wrapper would pass them — that is what the identity assertions are there for.
- [ ] Add a CHANGELOG entry under `## [Unreleased]` → `### Fixed`, written for an existing consumer (what changes for a deployer whose provider or hook rejects with a non-Error). CI's `check-changelog` gate fails once `src/orchestration/chatOrchestrator.ts` changes without one; this round adds only a test file, which the gate excludes.
- [ ] No spec edit is owed: `specs/hal-engine-config-hooks/spec.md` already carries the guarantee in its `## Error reporting` section, citing the two acceptance tests (replacing the recorded-flaw line and its "out of scope" framing). If line numbers drift, the spec's anchor set differs from base, so `node scripts/repoint-spec-anchors.mjs` skips this spec whole — correct the two anchors by hand; `node scripts/check-spec-anchor-names.mjs specs/hal-engine-config-hooks/spec.md` verifies them.

House rules the new file already satisfies, so the next round does not trip them: `re-lint/max-expects` allows one `expect` per test (both tests assert one object literal with `toEqual`), `re-lint/require-spec-link` is satisfied by the two spec citations, and `it.each` is avoided because the anchor tooling cannot see past it.

## Out of scope

- `beforeSession` escaping the `try` — its own issue.
- Usage accounting across tool rounds — HALEngine#93.
- Any change to what the caller receives: the ticket keeps the re-thrown value exactly as it is today, so the transport and its `error` frame are untouched.
- Widening the `onError` hook type to accept unknown values: the ticket wraps instead, so a hook typed against `Error` keeps compiling.