The acceptance test conflicts with the ticket’s required protocol and error behavior. It expects `list_sessions` / `session_list` and an empty list when the store lacks `listFor`; the ticket requires `list_conversations` / `conversation_list` and an `UNSUPPORTED` error.

The round cannot proceed without resolving that contract. I made no changes and ran no tests. No red tests or regressions were observed locally.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test requires different frame names and unsupported-store behavior than ticket #144."}}