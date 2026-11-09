Blocked by an acceptance-test conflict: `conversationList.acceptance.test.ts` requires an empty `session_list` when `listFor` is absent; ticket #144 explicitly requires an `UNSUPPORTED` error and forbids that empty-list fallback.

Per your instruction, I stopped without changing acceptance tests. No files changed, tests run, or commits pushed. The truncated CI brief does not establish red-test or regression counts.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests require an empty list for missing listFor, contradicting ticket #144's mandatory UNSUPPORTED error; the contract needs reconciliation."}}