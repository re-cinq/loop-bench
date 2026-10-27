Added and pushed acceptance test [conversationList.acceptance.test.ts](/var/tmp/loop-bench/runs/ab5b382a6448/workspace/target/src/transport/ws/conversationList.acceptance.test.ts), with its protocol spec citation and `.lore/dod.md`. The test reaches the real message handler and fails because `list_conversations` is currently rejected as unknown.

Actual failure:

```text
Unknown message type: list_conversations
Expected: conversation_list for the authenticated user
Received: INVALID_MESSAGE; listFor was not called
```

Ran only `npm test -- --runTestsByPath src/transport/ws/conversationList.acceptance.test.ts`. Commit `5280e14` is pushed; `git status` confirms the branch is even with its upstream, and `origin/main` was already up to date.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}