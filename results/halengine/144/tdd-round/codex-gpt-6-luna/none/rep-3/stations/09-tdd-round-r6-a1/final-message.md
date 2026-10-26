Fixed both CI findings: replaced the validation switch with a lookup table and adjusted the WebSocket test helper so a mixed request/barrier exchange drains earlier replies without including the barrier pong. Updated the spec and checklist.

The test I added failed first, then passed; the only test run was `src/transport/wsPingBarrier.test.ts` (2 tests). I fixed one CI regression in the conversation-list acceptance tests. The main-branch trace tool was unavailable in this session.

Committed and pushed as `0fd6be3`; the branch is up to date with its upstream. No unrelated smells found.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair validation dispatch and mixed ping-barrier frame collection","tdd_next":"acceptance green"}}