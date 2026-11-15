I wrote four acceptance tests for #144. All four fail because the engine doesn't handle conversation lists yet. They're committed and pushed to `loop-bench/144`. Merging `origin/main` brought in nothing new, and `git status` shows the branch level with its upstream.

**Strategy: `direct`.** The tests use two seams that already exist: the validator, and a real engine started with `startEngineWith` and reached over a real socket. No mocks. The new `history` option is passed in an options object built beforehand rather than written inline. That stops the TypeScript test runner from rejecting the unknown option before the code under test runs.

**The tests**, all in `src/transport/conversationList.acceptance.test.ts`:
1. **Validation:** `{type: 'list_conversations'}` is accepted. A bad `limit` (0, 201, 1.5, `'10'`) or a bad `before` cursor (a plain string, an unparseable date, only one of its two fields) is refused with a message naming the field.
2. **The list itself:** the frame carries another user's id but is answered with the connecting user's own three conversations. There is exactly one `conversation_list`, no `stream_end`, newest first, with ISO-string times. Paging with `limit` and `before` returns the next row. Reconnecting with `?sessionId=<row id>` gives `resumed: true` and that conversation's replay.
3. **Refusals:** with history off, or a store that has no `listFor`, the answer is an `UNSUPPORTED` error and no list. When `listFor` throws, the answer is `SERVER_ERROR` with no store detail. The socket stays open and the failure is logged with the session id.
4. **Not stuck behind a streaming turn:** the list arrives before an in-progress turn's `stream_end`.

**The red bar** (`NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/transport/conversationList.acceptance.test.ts`):
```
● … › accepts a list_conversations frame and refuses a bad limit or cursor, naming the field
    > 84 |     expect(validateMessage({type: 'list_conversations'}).valid).toBe(true);
    Expected: true   Received: false
● … › answers the connection's own user, newest first in ISO strings, pages as asked, and a row reopens by its id
    -   "conversation_list",
    +   "error",
        "pong",
● … › refuses with an error rather than an empty list when history is off, the store cannot list, or listFor fails
            "error",
    -       "UNSUPPORTED",
    +       "INVALID_MESSAGE",
● … › answers a list request while the session's turn is still streaming, before its stream_end
    Expected: "conversation_list"   Received: undefined
Tests:       4 failed, 4 total
```

**Spec links:** I added § 4.3 `list_conversations` to `specs/hal-engine-websocket-protocol/spec.md`. It has one statement per test, each with its `validated by` link. `check-spec-links` and `check-spec-anchor-names` both pass. This repo has no other way to tag a test with its spec, so the link in the spec is the only traceability. `.lore/dod.md` records the strategy, the tests and the remaining work as a checklist.

**Not covered by these tests**, and left to the implementing round and its review:
- The `messages.ts` change being additive only, and `ConnectedMessage` unchanged.
- The privacy (GDPR) wording in the spec and on the new options type.
- The CHANGELOG entry, the docs regenerated with `npm run docs:fix`, and the MINOR version bump.
- The startup warning when history is on but resume is off.
- `StoreCannotList` being answered `UNSUPPORTED`. The ticket doesn't say which module exports it, so a test importing it would only have guessed the path.
- A spy check that `listFor` was called with the connection's user id. Test 2 checks the same thing through the answer instead, because another user's conversations are in the store and must not appear.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}