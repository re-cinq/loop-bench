Three acceptance tests are committed and pushed. All three are red for the reason the ticket states: the socket does not answer `list_conversations` yet.

**Triage: `direct`.** The seam exists. The tests drive `createServer` over a real WebSocket through `startEngineWith`, and the store is the shipped `InMemorySessionStore`, whose `listFor` came in with #146.

**Files**
- `src/transport/conversationList.acceptance.test.ts` (new, the only test file)
- `.lore/dod.md` (new)

**Tests**
1. Answers `list_conversations` with the connecting user's conversations, newest first, with ISO times and no `stream_end`.
2. A `userId` sent in the frame is ignored, and the answer is the connecting user's own list.
3. With `history` absent, the answer is one `error` frame with code `UNSUPPORTED` and no list.

**Red bar** (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts`):
```
● answers list_conversations with the connecting user's conversations… 
    - Expected  - 1
    + Received  + 1
      Array [
    -   "conversation_list",
    +   "error",
      ]

● ignores a userId sent in the frame…
    Expected: ["newest", "middle", "older"]
    Received: undefined

● answers list_conversations with an UNSUPPORTED error…
    Expected: "UNSUPPORTED"
    Received: "INVALID_MESSAGE"

Tests: 3 failed, 3 total
```
The current `INVALID_MESSAGE` is the validator rejecting an unknown type, which is the absent behaviour. The option is passed through an untyped variable so the suite compiles and fails at runtime, not on a type error.

**Commit and push.** The commit is `8c16d8b`, pushed to `origin/loop-bench/144`. I amended the message to add the attribution line and force-pushed that one commit to the branch. `origin/main` was already an ancestor, so the merge was a no-op.

**Choices and gaps**
- The repo runs Jest, not Vitest, so I used the Jest command above.
- I kept to three tests. Limit/`before` validation, the streaming-lock ordering, the `listFor` failure path, and the resume round-trip are listed as facets in `.lore/dod.md`, not as tests.
- `specs/hal-engine-websocket-protocol/spec.md` has no un-linked statement about the list frames yet, so there are no `validated by` links to add. The spec extension is part of the build.
- I did not run lint, typecheck or the formatter's check beyond `prettier --write` on the new file. CI runs them on push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}