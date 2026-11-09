The current socket rejects `list_conversations`; the test run returned:

```text
Expected: "conversation_list"
Received: "error"

"code": "INVALID_MESSAGE",
"message": "Unknown message type: list_conversations"
```

I did not retain the partial tests because they could not establish the full requested contract under the no-mocks/no-stubs rule. In particular, the ticket requires recording the exact `listFor` argument and controlling store failures, but the current entry points expose neither observation nor failure control. The working tree is clean; no commit or push was made.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"dod_blocked":"Provide an integration seam for observing listFor arguments and triggering its failure modes without a mock or stub."}}