The ticket has a red acceptance test file, a DoD file, and a pushed commit. All three new tests fail for the reason the ticket gives.

**Strategy: `direct`.** The seam exists: `createChatOrchestrator` takes `hooks.onError`, and the `catch` in `processMessageStream` is the real entry point. The tests call `processMessage` with a provider that rejects with a non-Error value.

**Files (commit `5d34ae4`, pushed to `loop-bench/95`):**
- `src/orchestration/chatOrchestrator.acceptance.test.ts`: three tests. A thrown string gets its own test; a plain object and `undefined` share one `it.each`. Each asserts that `onError` is called once with an `Error` whose `cause` is the original value, and that the caller still gets the unchanged rejection.
- `.lore/dod.md`: quotes the ticket's central claim, names the strategy, lists the tests and the facets, and states the out-of-scope items.

**Red run.** I ran only this file with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts`:

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ... calls onError once with an Error whose cause is a thrown string, and the caller still gets the string
    - Expected  - 3
    + Received  + 3
      "caller": Object { "reason": "provider refused", "rejected": true },
    -   "cause": "provider refused",
    -   "isError": true,
    -   "onErrorCalls": 1,
    +   "cause": undefined,
    +   "isError": false,
    +   "onErrorCalls": 0,
  ● ... calls onError once with an Error whose cause is a plain object ...
    -   "onErrorCalls": 1,  +   "onErrorCalls": 0,   (caller still receives the object)
  ● ... calls onError once with an Error whose cause is undefined ...
    -   "onErrorCalls": 1,  +   "onErrorCalls": 0,
Tests: 3 failed, 3 total
```

Each failure is `onError` never being called, which is the claim in the ticket. The caller-side rejection is already correct, as the ticket says.

**Choices I made:**
- The Error-identity criterion is pinned by the existing `onError` tests in `chatOrchestrator.test.ts`, which I left unedited, so I wrote no new test for it.
- I did not add a `validated by` link to the spec. The recorded-flaw bullet in `specs/hal-engine-config-hooks/spec.md` describes today's behaviour, and the guarantee it should state does not exist until the fix lands. Changing that bullet, and the CHANGELOG entry, belong to the implementation.
- I formatted the test file with Prettier. I did not run lint, typecheck or the build.

**Branch sync.** `origin/main` was already an ancestor of the branch, so the merge produced nothing. `git status` reports the branch in sync with `origin/loop-bench/95`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}