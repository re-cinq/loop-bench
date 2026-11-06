I've committed and pushed five acceptance tests for #144 (commit `064a3d3`), and all five fail. The strategy is **`direct`**: the tests start the real `createServer` and send frames over a real socket, with no doubles.

**Central claim (quoted in `.lore/dod.md`):** "The engine already knows who is connected and already replays a conversation on resume; answering "which conversations do I have" over the same socket is the smaller surface."

**Files:**
- `src/transport/conversationList.acceptance.test.ts` holds the tests.
- `.lore/dod.md` holds the definition of done.
- `specs/hal-engine-websocket-protocol/spec.md` gains a new § 4.3 `list_conversations` and § 5.9 `conversation_list`. Each statement links to its test, and `npm run spec:names` reports that all 799 citations match a real test.

**The tests:**
1. **Own user's list:** the user gets their own conversations, newest first, with ISO times. The connection's own conversation is listed first. A `userId` in the frame is ignored, and the recorded `listFor` call shows `'u1'` with `{limit, before}` exactly as sent. Reconnecting with `?sessionId=` from a listed row returns `resumed: true` and replays that conversation.
2. **Validation:** a bad `limit` or `before` (cursor) is refused with a message naming the field.
3. **Refused when it can't answer:** with history off, or a store that has no `listFor`, the answer is an `UNSUPPORTED` error and no list.
4. **Store failure:** a failing `listFor` gets a `SERVER_ERROR` that leaks no store detail, an error log line with the session id, and the socket stays open.
5. **Not stuck behind a turn:** a list request sent while an answer is streaming gets its reply before that turn's `stream_end`.

**Red bar** (`NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/transport/conversationList.acceptance.test.ts`):
```
first: 'error' (expected 'conversation_list'), listCalls: [] — answeredTypes: ["error","error"]
bare: false, bounds: [false,false], cursor: false, refusals: all false
"code": "INVALID_MESSAGE"  (expected "UNSUPPORTED")   ×2
"code": "INVALID_MESSAGE"  (expected "SERVER_ERROR"), loggedForSession: false
order: ["stream_end"]  (expected ["conversation_list","stream_end"])
Test Suites: 1 failed, 1 total
```
Every failure has the same cause: the engine doesn't recognise a `list_conversations` frame and answers `INVALID_MESSAGE`. That is exactly the missing feature, not a broken import or fixture.

**Things to know:**
- The tests pass the new `history` option without a type cast and compare `UNSUPPORTED` as a plain string. That lets the file run before those types exist.
- The tests don't cover the new `StoreCannotList` export, because importing a name that doesn't exist yet would break the whole file. The build round's own tests need to cover it; `.lore/dod.md` says so.
- These parts of the ticket are left to the build round and CI, not to these tests:
  - `messages.ts` touching no existing line
  - the CHANGELOG entry
  - the regenerated getting-started docs
  - the MINOR version bump
- I didn't add the spec-anchor stamp the task asks for. `.lore/test-commands.yml` defines no field for a test to declare which spec it validates, so there was nothing to stamp.

The branch is pushed and level with its upstream. `origin/main` has no commits the branch lacks, so the merge changed nothing.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}