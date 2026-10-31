Repaired CI traceability links and eliminated duplicated WebSocket teardown setup. Committed and pushed `1244022`; branch is synced with upstream.

No tests ran locally: the only affected ticket test is an acceptance file, which this pod forbids. Prior CI reported 0 new test failures and 0 regressions; its failures were lint/spec-link checks.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI traceability anchors and share duplicated real-WebSocket teardown between the conversation-list and session-resume suites","tdd_next":"acceptance green"}}