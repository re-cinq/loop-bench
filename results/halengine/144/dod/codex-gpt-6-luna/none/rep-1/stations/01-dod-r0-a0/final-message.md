Added and pushed commit `abaea86` with the acceptance test, protocol citation, and direct-strategy DoD. The branch is up to date with its upstream; `origin/main` was already merged.

The named test fails because the server sends no `conversation_list` frame:

> Expected length: 1  
> Received length: 0  
> Received array: []

The server logs `Unknown message type: list_conversations`, matching the ticket’s reported gap. I ran only `src/transport/conversationList.acceptance.test.ts`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}