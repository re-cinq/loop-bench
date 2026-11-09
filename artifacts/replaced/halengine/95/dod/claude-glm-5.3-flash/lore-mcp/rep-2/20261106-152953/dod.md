# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` takes a provider and hooks, so an acceptance test can hand it a provider whose `sendMessage` throws a non-`Error` value and observe both `onError` and what the caller is rejected with. No production code is needed to make the test runnable; only to make it pass.

Run just the acceptance tests (the pod's Bash hook refuses a bare `npm test`):

```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.onError.acceptance.test.ts
```

## Done when these pass

- [ ] **reports every non-Error rejection to onError as an Error carrying it as cause** — RED today. A provider rejecting with a string, a plain object, and `undefined` fires `onError` exactly once each time, with an `Error` whose `cause` is that value (identity, not deep equality), and the caller is still rejected with the original value unchanged (identity). Fails today with `onErrorCallCount: 0` while `callerRejectedWithIsRejection: true` on all three shapes — the exact bypass the ticket reports.
      `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`
- [ ] **hands an Error rejection to onError as that same instance and rejects the caller with it** — GREEN today, kept as the guard the existing tests do not actually pin (they assert `error.message`, which a wrap-everything implementation could satisfy by copying the message). It pins the other half of the guarantee: an `Error` rejection reaches `onError` as the same instance, not a wrapper. It is not a red bar; the first test is.
      `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`

## Facets

- [x] Acceptance tests written and red for the ticket's stated reason (closed by this pod).
- [x] `specs/hal-engine-config-hooks/spec.md` — the recorded-flaw section (`## Measured semantics — out of scope`) replaced by `## Error reporting guarantee` carrying the two citations above (closed by this pod). The spec's `Status` row was not touched.
- [ ] The fix: in `src/orchestration/chatOrchestrator.ts`, the `catch` calls `hooks.onError` for every rejection, wrapping whatever is not already an `Error` in an `Error` carrying the original as `cause`, and still re-throws the original value unchanged at the caller boundary. Nothing else in the file moves.
- [ ] `CHANGELOG.md` gains an entry under `## [Unreleased]` saying what changes for an existing consumer: an `onError` hook now hears about rejections that are not `Error`s, receiving a wrapper `Error` whose `cause` holds the original value; what the caller is rejected with does not change. Required by the ticket's acceptance criteria; CI's changelog gate only fires once the non-test `src/` edit lands, which is that round.

## Out of scope

- `beforeSession` escaping the `try` (the ticket names it as its own issue).
- Usage accounting across tool rounds (HALEngine#93).
- The wrapper `Error`'s `message` wording: the tests pin `instanceof Error` and `cause` identity, not the text, so the implementer picks it.
- Any change to what the caller is rejected with — the re-thrown value stays exactly what it is today.