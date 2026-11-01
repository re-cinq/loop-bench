Blocked: `src/transport/conversationList.acceptance.test.ts:123` requires an empty `session_list` when `listFor` is absent. Ticket #144 explicitly requires `UNSUPPORTED` instead. The tests also use different frame names from the ticket.

Per your instruction, I stopped without changing acceptance tests. No files changed, tests run, commits, or pushes. CI reports acceptance failures; no regression failures are identified in the supplied excerpt.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests require an empty list for missing listFor, contradicting ticket #144's explicit UNSUPPORTED requirement; the acceptance contract needs correction."}}