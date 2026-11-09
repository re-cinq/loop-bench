The acceptance test described in [.lore/dod.md](/var/tmp/loop-bench/runs/84f2b380f6fc/workspace/target/.lore/dod.md) conflicts with the ticket: it expects an empty list when the store has no `listFor`, while the ticket explicitly requires an `UNSUPPORTED` error. It also specifies `list_sessions` and `session_list` rather than the ticket’s `list_conversations` and `conversation_list` frames.

The round is blocked because the instructions require stopping when an acceptance test is wrong. I made no changes and ran no tests. There were no local red tests or regressions observed.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests conflict with the ticket's required frame names and unsupported-store behavior."}}