I added one acceptance test, and it fails today for the reason the ticket gives. It's committed and pushed, and the branch is level with its upstream with `origin/main` already merged.

**Strategy: `direct`.** `createChatOrchestrator(...).processMessage` is the real entry point, so no new seam is needed.

**Test:** `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`. It has one `it.each` over three provider rejections: a string, a plain object and `undefined`. For each, it expects `onError` to be called once with an `Error` whose `cause` is the raw value. It also expects the caller to receive the original rejection unchanged. The already-an-`Error` case is covered by the existing tests in `chatOrchestrator.test.ts`, which I left unedited.

`.lore/dod.md` quotes the ticket's central claim and lists the test and the facets.

**Run** (`NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/chatOrchestrator.onError.acceptance.test.ts`):
```
● calls onError once with an Error caused by a string, and rethrows the original
    - "calls": 1,        + "calls": 0,
    - "cause": "plain string",  + "cause": undefined,
    - "isError": true,   + "isError": false,
      "caught": "plain string"
```
The plain-object case fails the same way. I read only the string output closely. The `undefined` case failed too, but I didn't read its output. `onError` is never called for these rejections, and the original is still rethrown. That is the ticket's claim, not a typo or a missing fixture.

**Not done:** the spec's recorded-flaw line at `specs/hal-engine-config-hooks/spec.md#L28` is untouched, so it has no `validated by` link to the new test. Replacing that line is one of the facets in `.lore/dod.md` for the implementing round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}