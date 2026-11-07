Pushed and up to date. Here's the summary:

**Strategy: `direct`** — both `validateMessage` and `createMessageHandler` are callable seams today. The extended `createMessageHandler(orchestrator, store, options)` signature passes extra args that JavaScript silently ignores at runtime, so all five tests reach real code and fail because the behaviour is absent.

**5 red tests** in `src/transport/ws/conversationList.acceptance.test.ts`:

| Test | Failure reason |
|------|----------------|
| Validation | `validateMessage({type: 'list_conversations'})` returns `{valid: false}` — "Unknown message type" |
| Happy path | No `conversation_list` frame sent; `listFrame` is undefined |
| Auth regression | `listFor` never called (0 calls) |
| Feature guard | Error code is `INVALID_MESSAGE`, not `UNSUPPORTED` |
| Non-blocking | `typesBeforeRelease` is `['entry_upsert', 'entry_upsert', 'entry_delta', 'error']`, no `conversation_list` |

```
Tests:       5 failed, 5 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}