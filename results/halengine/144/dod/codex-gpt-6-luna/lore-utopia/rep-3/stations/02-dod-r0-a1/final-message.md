Added the direct WebSocket acceptance test and recorded the spec link at the test’s current line. It checks that a request naming another user returns only the authenticated user’s summaries, with ISO timestamps, and that the store receives `alice` as the user id.

The named test fails because the handler rejects the frame as unknown:

> `error: "Unknown message type: list_conversations"`

Only `src/transport/ws/conversationList.acceptance.test.ts` was run. Commit `eedacc1` is pushed, the branch is up to date with `origin/main`, and the working tree is clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}