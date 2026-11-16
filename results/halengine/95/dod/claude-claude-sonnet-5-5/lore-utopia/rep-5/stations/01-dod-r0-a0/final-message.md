I committed and pushed one acceptance test file, and all three of its cases fail now. The branch is level with its upstream, and merging `origin/main` changed nothing.

**Strategy: `direct`.** `createChatOrchestrator(...).processMessage` with a provider that rejects and an `onError` hook is already a usable seam.

**Test file:** `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`. It has one parameterised test with three cases: a string, a plain object and `undefined`. Each case expects `onError` to be called once with an `Error` whose `cause` is the raw value, and expects the caller to receive that same value.

**How it fails.** I ran it with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.onError.acceptance.test.ts`. A plain `npx jest` can't load the ESM test files. The failure for the string case:

```
● onError for rejections that are not an Error (HALEngine#95) › calls onError once with an Error causing a string and rethrows the original
    expect(received).toHaveLength(expected)
    Expected length: 1
    Received length: 0
> 53 |     expect(seen).toHaveLength(1);
```

The plain-object and `undefined` cases fail the same way. That is the ticket's claim: the `instanceof Error` gate stops `onError` firing for non-Error rejections.

**What I did not do:**
- **Spec link:** I didn't add a `validated by` link to `specs/hal-engine-config-hooks/spec.md`. The only relevant line there is the recorded-flaw line, which the implementation round has to replace with the new guarantee. It can link the test then.
- **Same-instance criterion:** I didn't add a test for an `Error` reaching `onError` as the same instance. The existing `chatOrchestrator.test.ts` already covers it, and `.lore/dod.md` says to keep that file unedited.

`.lore/dod.md` holds the quoted claim, the strategy, the test and the remaining steps: the wrapping change, the spec line and the CHANGELOG entry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}