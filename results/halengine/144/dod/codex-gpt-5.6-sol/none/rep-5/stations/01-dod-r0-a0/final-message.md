Defined and pushed the `direct` acceptance-test DoD in commit `46060ee`.

Ran only:

`npm test -- --runTestsByPath src/transport/conversationList.acceptance.test.ts --runInBand`

All three acceptance tests failed for the expected missing behavior:

- `validates a list request...`: `"valid": false` instead of `true`
- Enabled request: `{"code":"INVALID_MESSAGE","message":"Unknown message type: list_conversations","type":"error"}` instead of `conversation_list`
- Default-off request: `"code": "INVALID_MESSAGE"` instead of `"UNSUPPORTED"`

The branch is merged with current `origin/main`, pushed, and not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}