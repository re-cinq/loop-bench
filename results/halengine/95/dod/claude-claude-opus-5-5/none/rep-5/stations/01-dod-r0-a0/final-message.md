I wrote the acceptance test for #95, and it fails today for the reason the ticket gives. It's committed and pushed to `loop-bench/95`. The branch already includes `origin/main` (the merge brought in nothing new) and is not ahead of its upstream.

**Strategy: `direct`.** The test calls the real entry point, `createChatOrchestrator(...).processMessage`, with a provider that throws something that isn't an `Error`. That reaches the `instanceof Error` check in the `catch` without any mocks.

**Test:** `src/orchestration/onErrorNonError.acceptance.test.ts` runs one test three times: for a string, a plain object and `undefined`. Each time it checks that:
- `onError` fires exactly once;
- it receives an `Error` that actually has a `cause`, and that `cause` is the thrown value;
- `processMessage` still rejects with the exact value that was thrown, not a copy or a wrapper.

The criterion that an existing `Error` reaches `onError` as the same instance is covered by the existing `ChatOrchestrator hooks › onError` tests. The ticket requires them to stay unedited, and `.lore/dod.md` lists them. I didn't run them here, because the rules limit me to running my own test.

**Red bar** (`NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/onErrorNonError.acceptance.test.ts`):
```
  ● onError for a rejection that is not an Error › calls onError once with an Error whose cause is a string, and the caller still receives the original rejection
    -   "cause": "provider exploded",
    -   "hasCause": true,
    -   "isError": true,
    -   "onErrorCalls": 1,
    +   "cause": undefined,
    +   "hasCause": false,
    +   "isError": false,
    +   "onErrorCalls": 0,
  ● ... cause is a plain object ...   (same: onErrorCalls 0, isError false)
  ● ... cause is undefined ...        (hasCause false, isError false, onErrorCalls 0)
Tests:       3 failed, 3 total
```
In all three cases the caller already gets the original value unchanged. The only failure is that `onError` is never called, which is exactly what the ticket reports.

**One gap in traceability:** the spec doesn't yet have a statement for this test to be linked from. Its only related line is the recorded-flaw line saying non-`Error` values skip `onError`. Writing the new guarantee in now would make a Shipped spec claim something untrue, so I left `specs/hal-engine-config-hooks/spec.md` as it is. Replacing that line is a step in `.lore/dod.md` for the next round, along with the exact link text (`onErrorNonError.acceptance.test.ts#L37`) and the CHANGELOG entry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}