Added and pushed commit `7bb81d2` with the acceptance test, DoD, and spec citation. The branch is up to date with `origin/main` and not ahead of its upstream.

The real WebSocket test failed for the ticket’s stated reason: the handler rejects the new frame as unknown.

> `Unknown message type: list_conversations`  
> Expected `type: 'conversation_list'`; received `type: 'error'`.

The citation reanchor script named in the instructions was absent, so I left existing citations unchanged; adding a statement to the spec does not shift their target test lines.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}