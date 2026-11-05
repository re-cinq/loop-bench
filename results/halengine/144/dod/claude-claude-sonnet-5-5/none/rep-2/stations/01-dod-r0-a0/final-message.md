I committed and pushed four acceptance tests in `src/transport/conversationList.acceptance.test.ts`. All four fail for the reason the ticket gives: a client cannot ask for its conversation list over the socket today. The branch is not ahead of its upstream, and merging `origin/main` brought in nothing new.

**Strategy: `direct`.** `createServer` over a real socket, `validateMessage` and `InMemorySessionStore.listFor` already exist, so the tests call the real entry points.

`.lore/dod.md` opens with the ticket's claim: "the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade."

I also added a `### 4.3 list_conversations` section to `specs/hal-engine-websocket-protocol/spec.md`. Its four statements each link to one of the tests. No `reanchor.mjs` exists in this repo, so I set the `#Lnn` anchors by hand.

I ran only this file, with `NODE_OPTIONS=--experimental-vm-modules npx jest src/transport/conversationList.acceptance.test.ts`. That is what `npm test` does through `package.json`; CI runs the same suite. Failures, trimmed:

- **Validation:** `first: "Unknown message type: list_conversations"` where `"valid"` was expected, and the five bad-input cases do not name `limit` or `before`.
- **Own list:**
  ```
  type: "error"            (expected "conversation_list")
  askedFor: []             (expected ["u1"])
  limit: undefined         (expected 50)
  seededOrder: []
  ```
- **History off:** `code: "INVALID_MESSAGE"` where `"UNSUPPORTED"` was expected.
- **Store without `listFor`:** `code: "INVALID_MESSAGE"` where `"UNSUPPORTED"` was expected.

The four tests, one per behaviour:
- **Validation:** `limit` 0, 201, 1.5 and `'10'`, and an unparseable `before`, are refused naming the field; the bare frame is valid.
- **Own list:** with history on, one `conversation_list` comes back newest first with ISO times and no `stream_end`. A frame carrying another user's `userId` still reaches `listFor` as `u1`, and `limit` is passed through.
- **History off:** the frame is answered `UNSUPPORTED` with no list.
- **No `listFor`:** the frame is answered `UNSUPPORTED`, never an empty list.

Things to know:
- I did not write tests for the other acceptance criteria. They are listed as facets in `dod.md`: the `before` cursor, `SERVER_ERROR` on a rejecting store, `StoreCannotList`, answering during a streaming turn, resume by listed id, the startup warning, the CHANGELOG, the docs regeneration, and the GDPR spec text.
- The "own list" test filters on the three seeded ids rather than counting rows. The ticket says the connection's own fresh conversation is also listed, so a count of exactly three would be wrong.
- The history option is spread into the server options, so the file compiles before `history` exists as a typed option.
- `npx prettier --write` rewrapped about 60 lines of the existing spec tables. I restored them in a follow-up commit, so the spec diff against `main` is only the new section.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}