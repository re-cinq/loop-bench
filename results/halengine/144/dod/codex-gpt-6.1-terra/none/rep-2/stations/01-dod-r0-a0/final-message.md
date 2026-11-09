Committed and pushed the `direct` acceptance tests and definition of done in commit `d6b4f03`. The branch is up to date with `origin/main` and its upstream.

The targeted Jest run failed all three tests for the missing WebSocket behavior:

> `"error": "Unknown message type: list_conversations"`  
> Expected a `conversation_list`; received an `INVALID_MESSAGE` error.  
> Expected `UNSUPPORTED`; received `INVALID_MESSAGE`.
>
> `Test Suites: 1 failed, 1 total`  
> `Tests: 3 failed, 3 total`

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}