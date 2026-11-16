I wrote two acceptance tests for #94 and both fail today. I ran only that file, with `NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/beforeSessionFailure.acceptance.test.ts`. Both are committed and pushed, the branch is up to date with `origin/main`, and `git status` shows it isn't ahead of its upstream.

**Strategy: `direct`.** `createHalEngine(...).orchestrator.processMessage` already takes hooks, so the tests call it as it is today.

The tests are in `src/orchestration/beforeSessionFailure.acceptance.test.ts`:
- **Rejection and `onError`:** a throwing `beforeSession` still rejects to the caller with the original error, and `onError(session, error)` fires with that same `Error`.
- **`afterSession`:** the hook order is `beforeSession`, `onError`, `afterSession`.

I also added a linked statement for both tests to `specs/hal-engine-config-hooks/spec.md`, and wrote `.lore/dod.md`. It opens with the ticket's claim, "`beforeSession` is awaited before the `try` block opens…".

Failure output:
```
● still rejects to the caller, and fires onError with the session and the thrown Error
    - Expected  - 6   + Received  + 1
    - Array [ Object { "error": [Error: beforeSession failed], "sessionId": "s-before-throws" } ]
    + Array []
● still runs afterSession, so a resource allocated in beforeSession can be released
      Array [
        "beforeSession",
    -   "onError",
    -   "afterSession",
      ]
Tests: 2 failed, 2 total
```
Each failure is the ticket's stated problem: the rejection assertion passes, then `onError` and `afterSession` never fire.

Not covered by the tests, left to the implementing round:
- The spec's recorded-flaw line in the "Measured semantics" section is still there.
- The ticket also asks for the spec to say what `afterSession` can assume about how much of the turn ran, and for a CHANGELOG entry. Neither is testable behaviour. Both are listed under Facets in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}