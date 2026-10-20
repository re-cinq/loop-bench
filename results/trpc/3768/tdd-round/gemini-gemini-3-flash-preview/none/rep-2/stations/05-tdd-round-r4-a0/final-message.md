I have completed a round focused on verifying the `localLink` implementation and fixing a regression in the `jsonlStreamConsumer` that was identified as a likely cause of the current CI failure.

### Summary of work:
1.  **Research & Verification:** Analyzed the `localLink` implementation in `packages/client/src/links/localLink.ts`. I wrote new facet tests covering `tracked()` envelopes and data transformers to ensure full compliance with the expected tRPC link behavior. These tests passed, confirming the `localLink` core logic is sound.
2.  **Regression Fix:** Identified a bug in `jsonlStreamConsumer` within `packages/server/src/unstable-core-do-not-import/stream/jsonl.ts`. While the previous round added chunk registration for async iterables, it missed doing so for promises. This could lead to `isEmpty()` returning `true` prematurely if a promise was the only pending item not yet "seen" by the stream manager, triggering an early abort.
3.  **Implementation:** Added `streamManager.getOrCreate(chunkId)` for `CHUNK_VALUE_TYPE_PROMISE` in `decodeChunkDefinition`, ensuring consistent tracking for all async chunk types.
4.  **Validation:** Verified the fix with a reproduction test case featuring nested promises and async iterables. I also confirmed that the entire `jsonl.test.ts` suite passes with this change, ensuring no regressions in the "smart" abort logic relied upon by existing tests.

The `localLink` feature remains fully implemented as per the DoD, and this round addressed the likely remaining technical debt causing the red build.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"jsonlStreamConsumer promise registration fix","tdd_next":"acceptance green"}}