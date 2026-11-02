The acceptance tests for #144 are committed and pushed to `loop-bench/144`, and the branch is in sync with its upstream. The four tests all fail, and each fails because the frame or validation rule is absent.

**Strategy: `direct`.** The seam exists: `createServer` over a real socket, backed by the real `InMemorySessionStore.listFor` from #143/#146. No new module is needed for the tests to call the real entry point.

**Tests** (`src/transport/ws/conversationList.acceptance.test.ts`, run with `node --experimental-vm-modules node_modules/jest/bin/jest.js <path>`, the repo's own `test` script):
1. A plain `list_conversations` frame gets one `conversation_list`, newest first, ISO times, no `stream_end`, no entries.
2. A frame carrying `userId: 'u2'` from a `u1` connection gets `u1`'s list, and `u2`'s conversation never appears.
3. With history off, the answer is an `error` with code `UNSUPPORTED` and no list.
4. `validateMessage` accepts valid `limit`/`before` and refuses `limit` 0, 201, 1.5, `'10'` and `before: 'not a date'`, naming the field.

**Failure output** (the actual run):
```
● answers list_conversations with one conversation_list ... newest first ...
    Array [
    -   "conversation_list",
    +   "error",
        "pong",
      ]
● answers list_conversations with an UNSUPPORTED error ... while history is not enabled
    Array [
        Object {
    -     "code": "UNSUPPORTED",
    +     "code": "INVALID_MESSAGE",
          "type": "error",
        },
● accepts a list_conversations frame ... refuses any other limit or before ...
    Object {
    -   "valid": true,
    +   "valid": false,
      }
Tests: 4 failed, 4 total
```
The server answers `INVALID_MESSAGE` because `list_conversations` is an unknown type today. The second test fails the same way as the first, so I did not capture its output separately.

**Decisions to check:**
- **Row count conflict in the ticket.** The acceptance criteria say "three summaries", but the amendment says the connection's own conversation is listed too. I followed the amendment: the three seeded conversations come first, newest first, and the connection's empty conversation is last.
- **Ordering is not yet proven.** The ordering expectations in tests 1 and 2 are not reached in this red run, because they fail earlier on the missing frame. They are unverified until the build makes them pass.
- **Opt-in spread.** `HISTORY_ON` is passed as a spread, so the file compiles before `HalServerOptions` gains `history`. The failure stays a behaviour failure, not a type error.
- **Four tests.** That is above the "prefer one" target, because the ownership regression and the validation rule are distinct behaviours the ticket calls out. Each remaining criterion (lock bypass, `SERVER_ERROR` on store rejection, resume reconnect, spec/docs/changelog/version) is named as out of scope in `.lore/dod.md` or left as a build facet.
- **Not run:** lint, typecheck and prettier:check. I formatted the two files with prettier, as the rules ask. CI runs the rest.

`.lore/dod.md` quotes the ticket's central claim, sets the strategy, lists the four tests and the facets, and names the out-of-scope items.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}