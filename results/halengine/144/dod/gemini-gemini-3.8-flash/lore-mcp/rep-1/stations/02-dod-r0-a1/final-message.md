Defined Definition of Done for Ticket #144 with 3 acceptance tests in `src/transport/conversationList.acceptance.test.ts`, linked spec statements in `specs/hal-engine-websocket-protocol/spec.md`, and documented triage in `.lore/dod.md`.

Failure output when running `npm test src/transport/conversationList.acceptance.test.ts`:

```
FAIL src/transport/conversationList.acceptance.test.ts
  ● conversation list over websocket › delivers the authenticated user's conversation list over WebSocket, ignoring foreign userId in the frame

    expect(received).toEqual(expected) // deep equality

    - Expected  - 6
    + Received  + 3

      Object {
        "hasStreamEnd": false,
    -   "isoDates": true,
    -   "listType": "conversation_list",
    +   "isoDates": undefined,
    +   "listType": "error",
        "resumed": true,
    -   "sessions": Array [
    -     "s_newer",
    -     "s_older",
    -   ],
    +   "sessions": undefined,
      }

      143 |       resumed: resumeConnected.resumed,
      144 |       hasStreamEnd: seenTypes.includes('stream_end'),
    > 145 |     }).toEqual({
          |        ^
      146 |       listType: 'conversation_list',
      147 |       sessions: ['s_newer', 's_older'],
      148 |       isoDates: true,

      at Object.<anonymous> (src/transport/conversationList.acceptance.test.ts:145:8)

  ● conversation list over websocket › refuses list_conversations with an UNSUPPORTED error when history is not enabled or the store cannot list

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "disabledCode": "UNSUPPORTED",
    +   "disabledCode": "INVALID_MESSAGE",
        "disabledType": "error",
    -   "noListCode": "UNSUPPORTED",
    +   "noListCode": "INVALID_MESSAGE",
        "noListType": "error",
      }

      178 |       noListCode: frame2.code,
      179 |       noListType: frame2.type,
    > 180 |     }).toEqual({
          |        ^
      181 |       disabledCode: 'UNSUPPORTED',
      182 |       disabledType: 'error',
      183 |       noListCode: 'UNSUPPORTED',

      at Object.<anonymous> (src/transport/conversationList.acceptance.test.ts:180:8)

  ● conversation list over websocket › answers list_conversations without waiting for a streaming turn in progress to end

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 1

      Object {
        "hadStreamEndBeforeList": false,
    -   "receivedType": "conversation_list",
    +   "receivedType": "error",
      }

      228 |       receivedType,
      229 |       hadStreamEndBeforeList: framesBeforeGate.includes('stream_end'),
    > 230 |     }).toEqual({
          |        ^
      231 |       receivedType: 'conversation_list',
      232 |       hadStreamEndBeforeList: false,
      233 |     });

      at Object.<anonymous> (src/transport/conversationList.acceptance.test.ts:230:8)

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
Snapshots:   0 total
Time:        0.355 s, estimated 1 s
Ran all test suites matching src/transport/conversationList.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}