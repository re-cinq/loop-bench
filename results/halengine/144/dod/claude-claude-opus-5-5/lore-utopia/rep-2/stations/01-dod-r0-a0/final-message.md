Ticket #144 now has a definition of done: five acceptance tests, all failing. They are committed and pushed on `loop-bench/144`, and the branch is level with its upstream. Merging `origin/main` brought in nothing new.

**Strategy: `direct`.** `createServer` over a real socket is the entry point. Each test opens a real connection, sends a `list_conversations` frame and reads the frames that come back. The store is a real `InMemorySessionStore`, subclassed only to record what `listFor` is called with, or to fail the way a database would. No production code was written.

**What was added:**
- `src/transport/conversationList.acceptance.test.ts`, a new file with the five tests.
- A new § 4.3 `list_conversations` in `specs/hal-engine-websocket-protocol/spec.md`. It has five statements, each linked to its test, including the GDPR rule that the user id comes from the connection and never from the frame. `check-spec-links` and `check-spec-anchor-names` pass.
- `.lore/dod.md`, in the required shape.

The tests pass `history` to `createServer` through an object spread. That way the file compiles before `HalServerOptions.history` exists, and still compiles once it does.

**Red bar** (`NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/transport/conversationList.acceptance.test.ts`). All five fail for the same reason: the engine doesn't know the frame yet.
```
● answers list_conversations with one conversation_list ...
-   "seededOrder": ["newest","middle","oldest"],   +   "seededOrder": [],
    "types": [ -  "conversation_list",  +  "error" ]
● lists the connection user, not a userId the frame carries ...
-   "calls": [["u1", {"before": {...}, "limit": 2}]]   +   "calls": [],   "listed": undefined
● answers an error and never a list when history is off, the store cannot list, or the store fails
-  "code": "SERVER_ERROR"  +  "code": "INVALID_MESSAGE"   (and UNSUPPORTED -> INVALID_MESSAGE twice; failureLogged false)
● answers a list asked for mid-turn before that turn stream_end ...
-   "conversation_list",  +   "error",   "stream_end"
● accepts a bare list_conversations and refuses a limit or cursor ...
-   "bare": true   +   "bare": false
+   "limitZero": "Unknown message type: list_conversations"  (same for every case)
```

**Not covered by a test:**
- **Docs and process criteria:** the `CHANGELOG.md` entry, regenerating the docs, the MINOR version bump, the `messages.ts` fixture showing no existing line changed, and an unchanged `ConnectedMessage`. These are listed as steps to do in `dod.md`.
- **Reconnecting with `?sessionId=`:** this reuses the existing #45 path, so no new test was written for it.
- **`StoreCannotList`:** the new exported error isn't imported, because the import would break the file until the export exists. The test still pins the no-`listFor` store being answered `UNSUPPORTED`.

**One thing to know:** `specs/hal-engine-websocket-protocol/spec.md` didn't pass Prettier before this change either. The repo's own Prettier check covers only `.ts` files, so I left the rest of the file's formatting alone.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}