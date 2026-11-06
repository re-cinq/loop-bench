I've added one acceptance test for ticket #95 and pushed it. It fails today for the reason the ticket gives. The branch `loop-bench/95` is level with its upstream and already up to date with `origin/main`.

**Strategy: `direct`.** The test goes through `createChatOrchestrator(...).processMessage` with a real provider that rejects. No mocks.

**The test:** `src/orchestration/chatOrchestrator.acceptance.test.ts` has one parameterised test with three cases: a string, a plain object and `undefined`. Each case checks that `onError` is called exactly once, with an `Error` whose `cause` is the original value, and that the caller gets back that same value unchanged.

Command: `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`

```
  ● ChatOrchestrator onError for a rejection that is not an Error › calls onError once with an Error whose cause is a string, and the caller still receives the original rejection
    -   "causeIsOriginal": true,
    -   "hasCause": true,
    -   "isError": true,
    -   "onErrorCalls": 1,
    +   "causeIsOriginal": false,
    +   "hasCause": false,
    +   "isError": false,
    +   "onErrorCalls": 0,
        "rejected": true,
        "sameRejection": true,
Tests:       3 failed, 3 total
```

The plain-object and `undefined` cases fail the same way, with `onErrorCalls: 0`. The caller already receives the original rejection, which the ticket says must stay that way. The four existing `onError` tests in `chatOrchestrator.test.ts` pass today (`Tests: 22 skipped, 4 passed`), and the DoD requires them to stay green without edits.

**Also in the commit:**
- **Spec:** in `specs/hal-engine-config-hooks/spec.md`, I replaced the "Measured semantics" line that recorded the flaw with the new guarantee, linked to the test. The ticket asks for this. The link checker reports 0 misplaced links.
- **`.lore/dod.md`:** records the claim, the strategy and the remaining work: the change to the `catch` in `chatOrchestrator.ts` and a CHANGELOG `### Fixed` entry.

**One gap:** the ticket says an `Error` must reach `onError` as the same instance, not a wrapper, and that existing tests already pin this. They don't quite: they compare only the error's `message`, so a wrapper that copies the message would still pass. I didn't add a stricter test because it would pass today and wouldn't be red. It's noted under Out of scope in the DoD.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}