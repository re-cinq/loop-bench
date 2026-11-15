Perfect! I have successfully defined DONE for ticket #144 as executable acceptance tests. Here's what I've created:

## Definition of Done Document

I created `.lore/dod.md` documenting the **parallel-change** strategy: the message handler exists but must dispatch the new `list_conversations` message type. A new protocol frame and validation rules are needed.

## Acceptance Test Suite

I created `src/transport/ws/conversation-list.acceptance.test.ts` with 19 tests covering:

**Validation tests (6 pass, testing input constraints):**
- `list_conversations` with no fields, valid limits (1–200), and valid ISO date strings
- Rejects invalid inputs: limit 0, 201, 1.5, '10', invalid dates

**Message handler tests (13 fail, testing behavior):**
- Returns `error UNSUPPORTED` when `history` is not enabled
- Returns `conversation_list` with 3 summaries when enabled and store supports `listFor`
- Uses `ws.userId` from connection, ignoring frame `userId`
- Passes `limit` and `before` parameters to `store.listFor` unchanged
- Returns `error UNSUPPORTED` when store has no `listFor` method
- Returns `error SERVER_ERROR` when `store.listFor` rejects
- Includes no `stream_end` after conversation list (not a turn)
- Returns metadata as ISO strings (`createdAt`, `updatedAt`, never content)

## Test Results

All 13 handler tests fail because `list_conversations` is not yet recognized:

```
Test Suites: 1 failed, 1 total
Tests:       13 failed, 6 passed, 19 total

Expected value: "conversation_list 3"
Received array: ["error INVALID_MESSAGE"]

Expected value: "error UNSUPPORTED"
Received array: ["error INVALID_MESSAGE"]

Expected: "u1", Anything
Number of calls: 0
```

Validation tests pass because they test error cases that work. Handler tests fail with `INVALID_MESSAGE` because `list_conversations` is not in the validator's switch statement yet.

## Branch Status

- Committed: `.lore/dod.md` and `src/transport/ws/conversation-list.acceptance.test.ts`
- Pushed to `origin/loop-bench/144`
- Up to date with `origin/main`
- Working tree clean

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"parallel-change"}}