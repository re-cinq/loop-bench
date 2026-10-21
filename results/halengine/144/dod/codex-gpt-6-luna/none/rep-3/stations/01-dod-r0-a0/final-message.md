Added a real WebSocket acceptance test for authenticated conversation lists, linked it from the protocol spec, and recorded the direct strategy in `.lore/dod.md`.

The named test failed for the missing behavior:

> Expected: `"conversation_list"`  
> Received: `"error"`  
> `Unknown message type: list_conversations`

Committed as `97b3ba5` and pushed to `origin/loop-bench/144`. `origin/main` was already merged, and the branch is up to date with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}