I have defined the Definition of Done for ticket #144 (*Deliver a user's conversation list over the WebSocket protocol*) through three executable acceptance tests in `src/transport/conversationList.acceptance.test.ts`, recorded the triage strategy in `.lore/dod.md`, and updated `specs/hal-engine-websocket-protocol/spec.md` with statements and citations linked to each test.

### Acceptance Test Failures

Executed command:
`node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts`

```text
FAIL src/transport/conversationList.acceptance.test.ts
  ● conversation list over WebSocket › delivers the authenticated user's conversation list over WebSocket, ignoring any userId in the frame

    expect(received).toBe(expected) // Object.is equality

    Expected: "conversation_list"
    Received: "error"

      145 |     const response = await nextFrame(client);
      146 |
    > 147 |     expect(response.type).toBe('conversation_list');
          |                           ^
      148 |     expect(response.conversations).toBeDefined();
      149 |     expect(response.conversations).toHaveLength(3);
      150 |     expect(response.conversations?.map(c => c.sessionId)).toEqual(['s3', 's2', 's1']);

      at Object.<anonymous> (src/transport/conversationList.acceptance.test.ts:147:27)

  ● conversation list over WebSocket › answers list_conversations with an UNSUPPORTED error frame when history is not enabled

    expect(received).toBe(expected) // Object.is equality

    Expected: "UNSUPPORTED"
    Received: "INVALID_MESSAGE"

      178 |
      179 |     expect(response.type).toBe('error');
    > 180 |     expect(response.code).toBe('UNSUPPORTED');
          |                           ^
      181 |   });
      182 |
      183 |   it('answers list_conversations without waiting for an in-flight streaming turn on the session lock', async () => {

      at Object.<anonymous> (src/transport/conversationList.acceptance.test.ts:180:27)

  ● conversation list over WebSocket › answers list_conversations without waiting for an in-flight streaming turn on the session lock

    expect(received).toBe(expected) // Object.is equality

    Expected: "conversation_list"
    Received: undefined

      212 |       await eventually(() => receivedFrames.some(f => f.type === 'conversation_list' || f.type === 'error'));
      213 |       const listFrame = receivedFrames.find(f => f.type === 'conversation_list');
    > 214 |       expect(listFrame?.type).toBe('conversation_list');
          |                               ^
      215 |
      216 |       const streamEndIndex = receivedFrames.findIndex(f => f.type === 'stream_end');
      217 |       expect(streamEndIndex).toBe(-1);

      at Object.<anonymous> (src/transport/conversationList.acceptance.test.ts:214:31)

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
Snapshots:   0 total
Time:        0.294 s, estimated 1 s
Ran all test suites matching src/transport/conversationList.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}