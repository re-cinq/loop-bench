Added five executable acceptance tests for `#144` in `src/conversationList.acceptance.test.ts` (strategy `direct`), linked them from `specs/hal-engine-websocket-protocol/spec.md`, recorded the triage in `.lore/dod.md`, and pushed commit `8f9c745` to `origin/loop-bench/144` (synced with `origin/main`, working tree clean).

Verified checks:
- `node scripts/check-spec-links.mjs`: `misplaced: 0 across 0 specs (1920 statements scanned)`
- `node scripts/check-spec-anchor-names.mjs`: `check-spec-anchor-names:  796 citation(s) name the test they point at`
- `NODE_OPTIONS=--experimental-vm-modules npx jest src/conversationList.acceptance.test.ts`:

```text
FAIL src/conversationList.acceptance.test.ts
  ● conversation list over the WebSocket protocol › validates list_conversations with optional integer limit 1-200 and composite before cursor, and refuses bad values by field name
    "error": "Unknown message type: list_conversations", "valid": false
  ● conversation list over the WebSocket protocol › delivers the connecting user own conversation list newest first with ISO timestamps, ignores frame userId, pages with limit and before, and resumes a listed id
    firstTypes: ["error", "pong"], firstIds: [], recordedCalls: [], resumed: false
  ● conversation list over the WebSocket protocol › answers list_conversations before a streaming user_message finishes on the same session
    seenList: false, beforeStreamEnd: false, observedTypes: ["connected", "entry_upsert", "entry_upsert", "entry_delta", "error", "entry_commit", "stream_end"]
  ● conversation list over the WebSocket protocol › answers UNSUPPORTED when history is off, when the store omits listFor, or when StoreCannotList is thrown, and SERVER_ERROR without store details when listFor rejects
    historyOffReply/omittingListForReply/cannotListReply/rejectedReply all returned code: "INVALID_MESSAGE", ErrorCodes lacks UNSUPPORTED, loggedSessionId: false
  ● conversation list over the WebSocket protocol › warns at startup when history is enabled without resume
    Expected: true, Received: false

Test Suites: 1 failed, 1 total
Tests:       5 failed, 5 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}