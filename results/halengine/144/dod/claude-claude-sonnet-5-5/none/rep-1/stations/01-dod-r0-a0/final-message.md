I committed and pushed four acceptance tests for #144. All four fail today because the feature is absent. The branch is level with its upstream, and `origin/main` was already merged in.

I ran only `src/transport/conversationListFrame.acceptance.test.ts` (`NODE_OPTIONS=--experimental-vm-modules npx jest <file> --silent`). Strategy is `direct`: `validateMessage`, `createServer` and the real WebSocket upgrade already exist, so the tests drive them as they are.

The ticket's central claim, quoted in `.lore/dod.md`, is that `listFor` "does not give a **client** anything: the browser holding the socket cannot reach the store".

| Test | Failure today |
|---|---|
| accepts a bare `list_conversations` and names the field of any bad `limit` or `before` | all seven cases return `"Unknown message type: list_conversations"` instead of valid, `limit` or `before` |
| answers the connecting user their own conversations, newest first, whatever `userId` the frame carries | the answer is `error` instead of `conversation_list`, and `listFor` is never called |
| answers one `UNSUPPORTED` error when history is off or the store cannot list | both cases return `error:INVALID_MESSAGE` instead of `error:UNSUPPORTED` |
| answers a list request while a `user_message` is streaming, before its `stream_end` | only `stream_end` arrives, no `conversation_list` |

**Not pinned:** the tests do not cover these acceptance criteria:
- a `listFor` rejection answered as `SERVER_ERROR` with the failure logged without user content
- `StoreCannotList` answered as `UNSUPPORTED`
- resume by id from a list row, which is the existing #45 path
- `ConnectedMessage` unchanged
- the CHANGELOG entry
- the `example/full-config.ts` change and `npm run docs:fix`
- the startup warning for `history` without `resume`

I listed them as facets in `.lore/dod.md`.

**Spec edit:** I added a § 4.3 `list_conversations` to the protocol spec, with a `validated by` citation on each of the four statements. `scripts/spec-links/reanchor.mjs` doesn't exist in this repo, so I wrote the line links by hand. I did not touch any `Status` row.

**Test shape:** the seeded user has two earlier conversations, and the connection's own new conversation is the third row. That follows the ticket's amendment that the current conversation is listed like any other. I had the test files pass the new `history` option through a spread so they fail on behaviour, not on a TypeScript error, because ts-jest type-checks.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}