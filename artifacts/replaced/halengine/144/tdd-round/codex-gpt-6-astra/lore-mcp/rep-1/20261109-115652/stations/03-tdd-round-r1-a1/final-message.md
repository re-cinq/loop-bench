Blocked: the acceptance test at `src/transport/conversationList.acceptance.test.ts:150` requires an empty list when `listFor` is absent; ticket #144 explicitly requires `UNSUPPORTED`. The frame names also differ.

Your instruction says to stop if acceptance tests are wrong. No files changed, tests run, commits, or pushes. New red tests: 0; regression count unknown from the truncated CI verdict.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict ticket #144: missing listFor must return UNSUPPORTED, but the acceptance bar requires an empty session_list."}}