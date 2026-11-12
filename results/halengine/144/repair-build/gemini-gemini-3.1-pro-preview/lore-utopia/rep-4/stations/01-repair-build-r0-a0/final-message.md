I have implemented the fixes for the issues reported by CI on your latest push.

The problem was that the tests were expecting `[]` (an empty `session_list`) when the store had no `listFor` implementation and for any thrown error to result purely in a standard `SERVER_ERROR`. However, the acceptance criteria mandated that a missing implementation for `listFor`, or an explicit `StoreCannotList` error, should both return an `UNSUPPORTED` error code. I resolved this by extracting `StoreCannotList` to `src/types/sessionStore.ts`, threading the `history` configuration down to the WebSocket `createMessageHandler`, adding logic to respond with `UNSUPPORTED`, and updating the corresponding tests. 

Additionally, I resolved all reported lint errors:
1. Reused test teardowns and setup fixtures by moving duplicate logic into `src/transport/wsTestSupport.ts`.
2. Removed the use of the boolean literal arguments (`Array(9).fill(false)`) in `validation.test.ts` with `Array.from`.
3. Improved branching with an early return in the `askAfterConnect` handler. 

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"fixed eslint failures and updated list sessions test to expect UNSUPPORTED when listFor is absent or throws StoreCannotList"}}