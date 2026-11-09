Blocked: [the acceptance test](target/src/transport/conversationList.acceptance.test.ts:125) requires an empty `session_list` when `listFor` is unavailable; ticket #144 explicitly requires an `UNSUPPORTED` error. The protocol names also differ.

Per your instruction to stop when acceptance tests are wrong, I left files unchanged. No tests ran, and nothing was committed or pushed. New red tests: 0; regression count is unverified from the truncated CI verdict.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests require an empty session_list for missing listFor, contradicting ticket #144's required UNSUPPORTED error; the contract needs reconciliation."}}