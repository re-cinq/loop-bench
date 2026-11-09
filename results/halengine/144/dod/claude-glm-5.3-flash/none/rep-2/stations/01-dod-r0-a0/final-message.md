Done. Branch `loop-bench/144` is pushed at `948cf1e`, up to date with `origin/main`, working tree clean.

## What I did

**Triage: `direct`.** Both seams the ticket needs already exist — `validateMessage` (`src/transport/ws/validation.ts`) and a real server upgrade (`wsTestSupport.startEngineWith`, the pattern `sessionResume.test.ts` uses). I wrote seven acceptance tests in a new file, `src/transport/conversationList.acceptance.test.ts`, that send a `list_conversations` frame to both today. Every one is red because the behaviour is absent — the frame is currently answered `error INVALID_MESSAGE` ("Unknown message type"), so no list, no authorisation, no `UNSUPPORTED`, no lock bypass, no reopen path exists. No production code was touched.

The seven tests pin, in order: the validation contract (fields alone, `limit` an integer 1–200, `before` the two-part ISO cursor, half a cursor refused, the field named, a frame-carried `userId` never forwarded); exactly one `conversation_list` newest-first with ISO-string times, exact row shape, own conversation listed, no `stream_end`; `listFor` called with `ws.userId` on recorded arguments with `limit`/`before` forwarded as sent; `UNSUPPORTED` not an empty list when history is off or the store has no `listFor`; `SERVER_ERROR` with no store detail and a socket that stays open, plus `StoreCannotList` → `UNSUPPORTED` (read off the package surface, so its absence is the stated red); a history request answered beside a streaming turn before `stream_end`; and an id from a row reopened with `?sessionId=` through the shipped resume path.

I also wrote the statements and `([validated by: ...])` citations into both specs (§4.3 and §5.9 plus the `UNSUPPORTED` code row in the protocol spec; a new "Over the websocket" section in the conversation-list spec), without touching any `Status` row, and recorded the strategy and remaining facets in `.lore/dod.md`. The repo's cheap spec gates pass here: `spec:names` (812 citations name their tests), `check:spec-links` (0 misplaced), `check:spec-status` (0 findings).

## Quoted failure output

`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/transport/conversationList.acceptance.test.ts` — **Tests: 7 failed, 7 total**. Two representative reds:

```text
● … validates a list_conversations frame by its fields alone, naming the field it refuses
    "bare": Object {
-     "data": Object { "type": "list_conversations" },
-     "valid": true,
+     "error": "Unknown message type: list_conversations",
+     "valid": false,

● … answers exactly one conversation_list, newest first, with ISO times and no stream_end
    "types": Array [
      "connected",
-     "conversation_list",
+     "error",
    ],
```

## Notes for the next round (also in `.lore/dod.md`)

- The `history` option is passed through one `as unknown as` cast in the test's `start` helper, so the file compiles before `HalServerOptions` gains the field — drop the cast when it does.
- Today's off-lock shape already bypasses the lock for non-`user_message` frames, so the handler branch goes beside `ping`; but the generic error path (`log.error('message', 'handling error', {error, code})`) carries no session id, which the ticket's SERVER_ERROR criterion asks for — pin that log line in a unit test beside the handler (facet, not an acceptance subject).
- `npm run verify` / coverage floors, `docs:fix`, CHANGELOG, the version bump and the spec `Status` moves are facets for the green round, listed in the DoD.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}