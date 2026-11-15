The acceptance test is written, runs red for the reason the ticket gives, and is pushed to `loop-bench/95`. The branch is in sync with its upstream and already contains `origin/main`, so no merge was needed.

**Strategy: `direct`.** `createChatOrchestrator(...).processMessage` is a real seam. A provider whose `sendMessage` rejects, plus an `onError` hook, is enough to observe the gate.

**Test:** `src/orchestration/chatOrchestrator.nonErrorRejection.acceptance.test.ts`, one `it.each` over a string, a plain object and `undefined`. Each case asserts that the caller gets the original value back, and that `onError` runs once with an `Error` whose `cause` is that value.

**Red run.** I ran it with the repo's own ESM invocation, since bare `npx jest` fails on the ESM test setup:

```
node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.nonErrorRejection.acceptance.test.ts
```

```
    expect(received).toHaveLength(expected)

    Expected length: 1
    Received length: 0
    Received array:  []
  ● ... calls onError once with an Error whose cause is a string ...
  ● ... calls onError once with an Error whose cause is a plain object ...
  ● ... calls onError once with an Error whose cause is undefined ...

Tests:       3 failed, 3 total
```

The caller-identity assertion (`toBe(rejection)`) passes today, as the ticket says it should. The failure is only the missing `onError` call, which is the `instanceof Error` gate in `chatOrchestrator.ts:150`.

**Ticket criteria not covered by a new test:**
- The "already an `Error` passes through as the same instance" criterion is already true and pinned by the existing `onError` tests. Those must stay unedited, so I wrote no new test for it.
- The spec and CHANGELOG edits are implementation work. The spec's recorded-flaw bullet has no `validated by` link, so there is nothing to link to until the new guarantee statement exists. I did not add one.
- I did not run build, typecheck, eslint or the full suite, as instructed.

**Files committed:**
- `.lore/dod.md`, with the verbatim claim, the strategy, the test, facets and out-of-scope.
- The test file above.

Commit `6b9b383` carries the required `Co-Authored-By` line.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}