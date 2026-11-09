Blocked by an acceptance-contract conflict: `conversationList.acceptance.test.ts:109` requires an empty list when `listFor` is absent; ticket #144 explicitly requires `UNSUPPORTED` and forbids that empty-list response.

Following your instruction to stop when acceptance tests are wrong, I changed nothing and ran no tests. New red tests: 0; regressions identified: 0.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test requires an empty list for missing listFor, contradicting ticket #144's mandatory UNSUPPORTED response."}}