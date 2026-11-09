I could not complete the acceptance suite without leaving material ticket criteria untested, including the non-blocking response during streaming, store failure handling, and reconnecting from a listed conversation. I removed the incomplete tests so they cannot be mistaken for a complete definition of done; no changes were committed or pushed.

The exploratory tests reached the real validator and WebSocket server. All three failed for the reported missing behavior. The relevant output was:

```text
Expected: "type": "conversation_list"
Received: "code": "INVALID_MESSAGE",
          "message": "Unknown message type: list_conversations",
          "type": "error"

Tests: 3 failed, 3 total
```

LORE_NODE_RESULT: {"outcome":"failed"}