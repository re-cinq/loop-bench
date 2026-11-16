I wrote four acceptance tests in `src/transport/conversationList.acceptance.test.ts`, and all four fail today. I ran only that file, with `NODE_OPTIONS=--experimental-vm-modules npx jest src/transport/conversationList.acceptance.test.ts`. The commit is pushed, `origin/main` was already merged in, and the branch is not ahead of its upstream.

**Strategy: `direct`.** `createServer`, `validateMessage` and the in-memory store all exist, so the tests drive a real engine over a real socket. They use a thin `InMemorySessionStore` subclass that records what `listFor` was called with.

The ticket's central claim is that the browser holding the socket cannot reach `store.listFor(userId)`. Each test fails because the `list_conversations` frame is unknown today, so the server answers it as an invalid message.

| Test | Failure today |
|---|---|
| Validation of a bare frame, `limit` 0, 201, 1.5 and `'10'`, and a bad `before` | Every case comes back `Unknown message type: list_conversations` |
| The user's own list, newest first, with ISO times, even when the frame names another user, and `limit`/`before` passed to `listFor` | The server sends `error` twice instead of two `conversation_list` frames, and `listFor` is never called |
| Error code `UNSUPPORTED` and no list, both with history off and with a store that has no `listFor` | The code is `INVALID_MESSAGE`, not `UNSUPPORTED` |
| A list request sent mid-stream is answered before `stream_end` | Fails because the request is answered with an `error` frame rather than a list. I read only the first ~120 lines of output and did not see this test's failure text. |

I added the same-named spec statements (sections 4.3 and 5.9) to `specs/hal-engine-websocket-protocol/spec.md`, each with a `validated by` link to its test. `check-spec-anchor-names` reports 46 citations resolving. I wrote `.lore/dod.md`, and its quoted claim is a shortened fragment of the ticket's "Why" text.

- **Test assumptions:** The tests assume the option is named `history` on `createServer`, that `before` is the `{updatedAt, sessionId}` cursor from the amendments, and that the connection's own row counts among the three listed conversations.
- **Not pinned:** A `listFor` that rejects, `StoreCannotList`, the `history`-without-`resume` startup warning, the docs and the CHANGELOG are listed as facets in the DoD and have no tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}