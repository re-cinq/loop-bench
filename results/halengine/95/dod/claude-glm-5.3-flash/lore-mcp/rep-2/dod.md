# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` with an `onError` hook and a provider that rejects with a non-Error value, called through the real `processMessage` entry point. The acceptance tests call it today and fail on the missing behaviour (probed on the branch base: `onError` receives 0 calls for a string rejection while the caller still receives the string).

## Done when these pass

- [ ] **calls onError once for a string rejection, with an Error whose cause is that string** — a provider rejecting with a string reaches `onError` exactly once, wrapped in an `Error` whose `cause` is that same string, and the caller still receives the original rejection unchanged
  `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`
- [ ] **gives a plain object and an undefined rejection the same treatment** — the same wrapping for a plain object and for `undefined`, so no rejection shape bypasses the hook
  `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`

Run only these (the pod's Bash hook refuses a bare `npm test`):

```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.onError.acceptance.test.ts
```

## Facets

- [ ] In the `catch` of `processMessageStream` (`src/orchestration/chatOrchestrator.ts:150`), call `onError` for every rejection: pass the rejection straight through when it already is an `Error`, otherwise wrap it in an `Error` that preserves the original as its `cause`
- [ ] Leave the re-thrown value at the caller boundary exactly as it is today — the caller keeps receiving the original rejection, unchanged
- [ ] Leave the existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts` unedited and green; they pin that an `Error` rejection still reaches the hook and still propagates (ticket criterion 3 — no new test for it)
- [ ] CHANGELOG entry under `## [Unreleased]` saying what changes for an existing consumer; `scripts/check-changelog.sh` fails the CI build on a `src/` change without one (the spec edit this pod made already replaces the recorded-flaw line with the new guarantee, citing the two acceptance tests)

## Out of scope

- `beforeSession` escaping the `try` (its own issue) — the first recorded property in the old "Measured semantics" section, which this ticket's spec edit removes along with the flaw it recorded
- Usage accounting across tool rounds (HALEngine#93)
- Whether an already-`Error` rejection reaches `onError` as the same instance rather than a wrapper: the ticket assigns that to the existing tests remaining unedited, so it is a review constraint on the fix, not a new test in this file