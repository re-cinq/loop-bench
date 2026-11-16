I wrote one acceptance test for the ticket. It fails today for the reason the ticket gives, and it's committed and pushed. The branch is not ahead of its upstream. The merge with `origin/main` was a no-op.

**Strategy: `direct`.** `createChatOrchestrator(...).processMessage` with a rejecting provider and an `onError` hook is a real seam, so no new module is needed.

The test is `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`. It runs three cases (a string, a plain object and `undefined`). Each case expects `onError` to be called once with an `Error` whose `cause` is the original rejection. Each also expects the caller to still receive the original rejection unchanged.

I ran it with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.onError.acceptance.test.ts`. The string and plain-object cases failed with this output:
```
-   "calls": 1,        +   "calls": 0,
-   "causeIsRejection": true,   +   "causeIsRejection": false,
-   "isError": true,   +   "isError": false,
    "callerGotOriginal": true,
```
The output I read for the `undefined` case was cut off by `head`, so I didn't see its failure text. It uses the same assertion as the other two, and the `instanceof Error` gate skips it, so I expect the same result.

The caller already receives the original rejection. What's missing is that `onError` is never called.

- **`.lore/dod.md`:** it quotes the ticket's claim, names the strategy and lists the facets.
- **Spec:** I added a new guarantee bullet to `specs/hal-engine-config-hooks/spec.md`, linked to the test. I did not remove the recorded-flaw line or touch any Status. The implementation owes that replacement, along with the CHANGELOG entry.
- **Existing tests:** the existing `onError` tests were left unedited. They cover the "already an `Error` arrives as the same instance" criterion.
- **Link anchors:** `scripts/spec-links/reanchor.mjs` doesn't exist in this repo, so I set the `#L` anchor by hand to the test's line.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}