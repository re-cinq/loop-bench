I've written three acceptance tests for #95. All three fail for the reason the ticket gives, and they are committed and pushed to `loop-bench/95`. The branch was already up to date with `origin/main` and is not ahead of its upstream.

**Strategy: `direct`.** The tests go through the real entry point, `createChatOrchestrator(...).processMessage`. Each one installs a real `onError` hook and uses a provider that rejects with a non-`Error` value: a string, a plain object, or `undefined`. There are no mocks.

**Files:**
- `src/orchestration/onErrorNonError.acceptance.test.ts`: the three tests.
- `.lore/dod.md`: opens with the ticket's central claim quoted word for word, then lists the tests and the remaining work for the next round.
- `specs/hal-engine-config-hooks/spec.md`: I replaced the "Measured semantics" line that recorded the flaw with an "Error reporting" section. It has three statements, each linked to its test. `check-spec-anchor-names` and `check-spec-links` both pass.

**Red bar** (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/onErrorNonError.acceptance.test.ts`):
```
  ● onError for a rejection that is not an Error › calls onError once with an Error caused by a rejected string, and rethrows the string unchanged
      Object {
        "callerReceived": "provider exploded",
    -   "calls": 1,
    -   "causes": Array [
    -     "provider exploded",
    -   ],
    -   "isError": Array [
    -     true,
    -   ],
    +   "calls": 0,
    +   "causes": Array [],
    +   "isError": Array [],
        "rejected": true,
  ● ... rejected plain object, and rethrows the same object
    -   "calls": 1,
    -   "causeIsSame": true,
    +   "calls": 0,
    +   "causeIsSame": false,
  ● ... rejected undefined, and rethrows undefined
    -   "calls": 1,
    +   "calls": 0,
Tests:       3 failed, 3 total
```
In every case the caller already receives the original rejection unchanged (`rejected: true`, same value). What fails is `onError` firing: it is called 0 times. That is exactly the gap the ticket describes.

**Still owed by the next round:**
- **Fix:** in the `catch` at `chatOrchestrator.ts:150`, remove the `instanceof Error` gate. Wrap any non-`Error` in `new Error(…, {cause})` and keep rethrowing the original value.
- **CHANGELOG:** add an entry saying what changes for an existing consumer.

**Not covered by a new test:** the criterion that an `Error` reaches `onError` as the same instance. The ticket says the existing `chatOrchestrator.test.ts` tests, left unedited, pin that. A new test for it would pass today, so it can't be red.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}