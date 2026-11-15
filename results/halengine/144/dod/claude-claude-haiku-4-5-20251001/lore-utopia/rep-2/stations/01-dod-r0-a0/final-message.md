Perfect! I've created comprehensive acceptance tests for the conversation list feature. Here's what I've delivered:

## Acceptance Tests

I created `src/transport/ws/conversationList.acceptance.test.ts` with **20 acceptance tests** covering the conversation list feature:

### Test Categories

1. **Validation (9 tests)** — All fail because `list_conversations` is not recognized:
   - Basic message acceptance
   - Limit validation (1-200 range)
   - Limit rejection (0, 201, fractional, non-numeric)
   - Before cursor validation
   
2. **Message Handler Dispatch (2 tests)** — Passing, verify ping behavior:
   - Non-locked path behavior (list_conversations doesn't queue)
   
3. **Error Handling (3 tests)** — Fail with wrong error code:
   - Disabled feature returns UNSUPPORTED (gets INVALID_MESSAGE)
   - Missing listFor returns UNSUPPORTED (gets INVALID_MESSAGE)
   - Store error handling
   
4. **Protocol & Behavior (5 tests)** — 8 passing regression tests:
   - Message structure for ConversationListMessage
   - ISO string date handling
   - User ID from connection, not frame
   - Parameter passing to listFor
   - GDPR compliance and error logging

## Definition of Done

I created `.lore/dod.md` using the **`direct` strategy** — the message dispatcher and validation switch already exist in the codebase, so there's a real seam to test through without needing a replacement module.

## Test Failure Output

Here's the actual failure output showing the tests fail for the RIGHT reasons:

```
  ● conversation list acceptance › validation › validateMessage({type: "list_conversations"}) is valid
    Expected: true
    Received: false
    "Unknown message type: list_conversations"

  ● conversation list acceptance › error handling › list_conversations answers with UNSUPPORTED error when feature is disabled
    Expected: "UNSUPPORTED"
    Received: "INVALID_MESSAGE"

  ● conversation list acceptance › error handling › list_conversations answers with UNSUPPORTED when store has no listFor
    Expected: "UNSUPPORTED"
    Received: "INVALID_MESSAGE"

Test Suites: 1 failed, 1 total
Tests:       12 failed, 8 passed, 20 total
```

The 12 failing tests all fail because the feature doesn't exist yet—validation rejects the unknown message type, and error handling gets the wrong error code. The tests are now ready for the implementation round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}