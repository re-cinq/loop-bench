I wrote three acceptance tests for #95. All three fail for the reason the ticket gives, and they're committed and pushed to `loop-bench/95`. The branch was already up to date with `origin/main` and is not ahead of its upstream.

**Strategy: `direct`.** The tests call the real entry point, `createChatOrchestrator(...).processMessage`, with a provider whose stream rejects with a value that isn't an `Error`. That reaches the `instanceof Error` check at `src/orchestration/chatOrchestrator.ts:150` without any mocks.

**Tests** (`src/orchestration/chatOrchestrator.acceptance.test.ts`), one for each rejection the ticket lists:
- a string
- a plain object
- `undefined`

Each test checks that `onError` is called exactly once, that it gets an `Error` whose `cause` is the original value, and that the caller is rejected with the original value itself.

**Failure output** from `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts`, the same for all three cases:
```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● onError for a rejection that is not an Error (specs/hal-engine-config-hooks/spec.md#8) › calls onError once with an Error whose cause is the rejected string, and rejects the caller with the string
      Object {
        "callerRejected": true,
        "callerValueIsOriginal": true,
    -   "causeIsOriginal": true,
    -   "isError": true,
    -   "onErrorCalls": 1,
    +   "causeIsOriginal": false,
    +   "isError": false,
    +   "onErrorCalls": 0,
      }
```
This matches the ticket's claim exactly: `onError` is never called, while the original rejection still reaches the caller. The two caller-side checks already pass, so they guard the ticket's other requirement that the value the caller receives stays the same.

**Spec:** in `specs/hal-engine-config-hooks/spec.md` I replaced the "Measured semantics" section that recorded the flaw with three statements of the new guarantee. Each one cites its test by name and line (#L64, #L68, #L72). I didn't change the Status row. As instructed, I didn't run lint, the typechecker, or the repo's own spec checks (`spec:names`, `check:spec-links`). CI will check those citations, along with the long test-title lines that the formatter leaves alone.

**Left for the implementer** (listed in `.lore/dod.md`):
- Wrap anything that isn't an `Error` with `cause` and pass it to `onError`, then re-throw the original value.
- Add the CHANGELOG entry.
- The existing `onError` tests in `chatOrchestrator.test.ts` must stay green and unedited. They are what proves an `Error` rejection still reaches `onError` as the same instance rather than a wrapper.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}