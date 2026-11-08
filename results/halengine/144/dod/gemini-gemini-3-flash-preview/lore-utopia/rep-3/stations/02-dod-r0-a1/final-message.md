I have completed the task for ticket #144: "Deliver a user's conversation list over the WebSocket protocol".

I have updated the existing acceptance test file `src/transport/ws/conversationList.acceptance.test.ts` to include 10 comprehensive test cases covering the protocol validation, authorization rules, opt-in configuration, non-blocking handling, and integration with the session resume feature. I also recorded the strategy and the "Done when these pass" list in `.lore/dod.md`.

All 10 acceptance tests fail as expected, confirming that the requested behavior is currently absent. Specifically, the tests fail because `list_conversations` is an unknown message type and the necessary handler logic is not yet implemented.

### Test Failure Output
```text
FAIL src/transport/ws/conversationList.acceptance.test.ts
  ● conversation list (acceptance) › Protocol: types and validation - accepts valid list_conversations
    expect(received).toBeUndefined()
    Received: {"code": "INVALID_MESSAGE", "message": "Unknown message type: list_conversations", "type": "error"}

  ● conversation list (acceptance) › Handler: delivers conversation list - returns summaries with ISO strings
    expect(jest.fn()).toHaveBeenCalledWith(...expected)
    Expected: "u1", Anything
    Number of calls: 0

  ● conversation list (acceptance) › Handler: non-blocking - answers list_conversations while user_message is streaming
    expect(received).toBe(expected) // Object.is equality
    Expected: true
    Received: false

  ● conversation list (acceptance) › Integration: session resume - reconnecting with an id from the list receives resumed: true and replay
    TypeError: Cannot read properties of undefined (reading 'conversations')
```

I have formatted the changed files, committed them, and pushed the branch to the remote repository. The branch is also up to date with `main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}