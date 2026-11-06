I've committed and pushed one acceptance test for #95. It fails today for exactly the reason the ticket gives. The branch `loop-bench/95` is level with `origin/main` (merging it brought in nothing new) and not ahead of its upstream.

**Strategy: `direct`.** The test goes through the real entry point, `createChatOrchestrator(...).processMessage`. It uses a provider whose `sendMessage` throws, the same way the existing orchestrator tests do. It checks three rejection values: a string, a plain object and `undefined`. For each one it expects:
- `onError` is called exactly once;
- what `onError` receives is an `Error` that has its own `cause`, and that `cause` is the original value;
- the caller gets back the original value itself, unchanged.

**What changed:**
- **`src/orchestration/chatOrchestrator.acceptance.test.ts`:** the new test.
- **`specs/hal-engine-config-hooks/spec.md`:** a new statement for the guarantee, linked to the test with a `validated by` link. `check-spec-anchor-names` passes on the spec.
- **`.lore/dod.md`:** the triage and remaining steps for the next round. I left the spec's old "measured semantics" line describing the flaw in place, and I did not add the CHANGELOG entry. The ticket asks for both alongside the fix, so they are listed there as steps for whoever writes it.

**Failure output** from `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`:
```
● onError for a rejection that is not an Error › calls onError once with an Error wrapping a string, object or undefined rejection as its cause, and rethrows the original
    - Expected  - 24
    + Received  +  3
        "plainObject": Object {
    -     "onError": Array [ Object { "cause": Object {...}, "hasCause": true, "isError": true } ],
    +     "onError": Array [],
          "receivedIsOriginal": true,
        "string": Object {
    -     "onError": Array [ ... "cause": "provider exploded" ... ],
    +     "onError": Array [],
          "receivedIsOriginal": true,
        "undefined": Object {
    -     "onError": Array [ ... "hasCause": true ... ],
    +     "onError": Array [],
          "receivedIsOriginal": true,
```
In all three cases `onError` is never called, while the caller still gets the original rejection. That is the behaviour the ticket reports.

The ticket's third criterion is that an `Error` rejection reaches `onError` as the same instance. That already passes today, so it has no new test. The existing tests in `chatOrchestrator.test.ts`, left unedited, cover it, as the ticket says they should.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}