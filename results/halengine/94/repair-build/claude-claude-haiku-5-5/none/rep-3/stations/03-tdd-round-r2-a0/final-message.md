Branch is pushed. The round addressed the CI-failing MongoDB parallel download race condition by adding a Jest globalSetup (`jest.globalSetup.js`) that calls `MongoBinary.getPath()` in the main process before workers spawn — so the binary is cached by the time any worker tries to start MongoDB. The acceptance test for this ticket is not among the failing tests (it was passing already).

0 regressions caused by this ticket; the MongoDB failures were pre-existing infrastructure issues from a prior PR.

Unrelated smell noticed: the `instanceof Error` gate on `onError` in `chatOrchestrator.ts:150` limits the hook to only fire for `Error` instances — the ticket notes this as out of scope for its own issue.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix MongoDB parallel binary-download race condition (globalSetup)","tdd_next":"acceptance green"}}