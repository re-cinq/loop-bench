Ticket #94 is expressed as two acceptance tests. Both fail today for the reason the ticket gives, and the commit is pushed to `loop-bench/94`.

**Strategy: `direct`.** `createChatOrchestrator` with its `hooks` option is a real seam, so the tests call `processMessage` with a `beforeSession` that throws.

**Tests** (`src/orchestration/beforeSessionThrow.acceptance.test.ts`):
1. Calls `onError` with the same session and the thrown error, and the caller still sees the rejection.
2. Calls `afterSession` even though `beforeSession` threw.

**Red bar** (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/beforeSessionThrow.acceptance.test.ts`):

```
  ● ChatOrchestrator when beforeSession throws › calls onError with the session and the thrown error, and the caller still sees the rejection
    -   "onErrorGotSameSession": true,
    +   "onErrorGotSameSession": false,
    -   "receivedMessage": "span allocation failed",
    +   "receivedMessage": undefined,

  ● ChatOrchestrator when beforeSession throws › calls afterSession even though beforeSession threw, so a deployer can release what it allocated
    -   "afterSessionCalled": true,
    +   "afterSessionCalled": false,
```

The `outcome` field matches in both, so the rejection already reaches the caller unchanged. The failures are the missing `onError` and `afterSession` calls, which is the ticket's claim.

**Other notes:**
- `.lore/dod.md` quotes the central claim, lists the two tests, and has the facets for the fix, the spec decision, and the CHANGELOG entry.
- I did not edit the spec or the CHANGELOG. The spec's "Measured semantics" bullet about `beforeSession` is still unlinked, so the implementation round will need to replace it and add `validated by` links.
- The ticket asks the spec to record whether `afterSession` after a failed `beforeSession` means "never allocated" or "allocated and finished". No test pins that wording. It is a spec-text facet in `dod.md`.
- The Lore MCP tools were not available in this session, so I did not query Lore context.
- CI is the judge of the full suite. The lint, typecheck and build gates in the ticket were not run here.

Commit `e8c40f0` is on `origin/loop-bench/94`. The branch was already up to date with `origin/main` after the merge step, so no merge commit was needed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}