Added and pushed three red acceptance tests with `.lore/dod.md` and cited spec updates. The branch is up to date with `origin/main`, and `git status` shows no uncommitted changes.

Ran only `src/transport/conversationList.acceptance.test.ts`. All three tests fail because `list_conversations` is unknown:

> `Unknown message type: list_conversations`

> Expected `conversation_list`; received `error` with code `INVALID_MESSAGE`.

> Expected `UNSUPPORTED`; received `INVALID_MESSAGE`.

Commit: `51eeed6` (`test: define websocket conversation list acceptance`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}