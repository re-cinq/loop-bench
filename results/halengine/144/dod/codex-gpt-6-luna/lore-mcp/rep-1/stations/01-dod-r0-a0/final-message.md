Added one direct acceptance test and recorded the DoD in `.lore/dod.md`. The test exercises `createMessageHandler` with an authenticated socket and the real in-memory store.

It fails for the reported behavior: the handler responds `error` because `list_conversations` is unknown, instead of returning the user’s conversation list. The exact assertion output was:

```text
Expected: {"conversations":[{"entryCount":1,"sessionId":"own-session"}],"type":"conversation_list"}
Received: {"type":"error"}
```

The test is committed and pushed as `fe4229a`. `origin/main` was already up to date, and the branch is not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}