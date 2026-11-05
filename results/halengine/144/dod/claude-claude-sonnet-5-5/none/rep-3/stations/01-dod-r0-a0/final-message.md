I committed and pushed four acceptance tests in `src/transport/conversationList.acceptance.test.ts`. All four fail, and the failures match the ticket's claim. The merge with `origin/main` was already up to date, and the branch is not ahead of its upstream.

The DoD in `.lore/dod.md` quotes the claim, "A client cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route…". It records strategy `direct`, because `createServer` over a real WebSocket upgrade is an existing seam.

I ran the file with `NODE_OPTIONS=--experimental-vm-modules npx jest src/transport/conversationList.acceptance.test.ts`. The bare `npx jest` fails on ESM before any test runs.

Failure output:
- **Validation:** `validateMessage({type: 'list_conversations'}).valid` — Expected: true, Received: false.
- **Own list only:** the frame types are `["error"]` where `["conversation_list"]` was expected. The ticket's `userId` regression is covered here, with `userId: 'u2'` in the frame.
- **`listFor` arguments:** `calls` has length 0 where 1 was expected, so `listFor` is never called with `ws.userId` and `limit: 7`.
- **`UNSUPPORTED`:** the code is `INVALID_MESSAGE` where `UNSUPPORTED` was expected. Only the history-off case fails first; the missing-`listFor` case is never reached.

Gaps and findings:
- **Not pinned:** The `SERVER_ERROR` case, `StoreCannotList`, answering during a streaming turn, reconnect by id, `before` cursor passthrough and the startup warning. I kept to the "smallest set" rule, so later rounds should cover them. Say if you want them added now.
- **No spec edit:** I did not edit the spec, so no `validated by` links were added. The repo has no spec-anchor convention in tests, so I left a spec-anchor comment in the test file, and the DoD facets note the links as owed.
- **Test setup:** The tests pass `history` to `startEngineWith` through an `as never` cast, because the option type doesn't exist yet. The cast can go once `HalServerOptions` gains it.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}