Blocked: the acceptance test requires an empty `session_list` when `listFor` is missing, while ticket #144 explicitly requires `UNSUPPORTED` and forbids an empty list. It also expects listing without the required history opt-in.

Your instructions require stopping when acceptance tests are wrong. I changed nothing and ran no tests. No new red tests; regression counts cannot be determined from the truncated CI verdict.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict ticket #144 on missing-listFor errors and history opt-in; the acceptance contract needs correction."}}