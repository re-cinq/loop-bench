I wrote five acceptance tests for #144 and all five fail today. The branch is pushed and not ahead of its upstream, and `origin/main` was already merged.

Prettier also reformatted the tables in `specs/hal-engine-websocket-protocol/spec.md`, so that diff is noisier than my edit. The reformat is committed as is.

The central claim in `.lore/dod.md` is "Deliver a user's conversation list over the WebSocket protocol". The strategy is `direct`: `validateMessage` and `createServer` over a real socket already exist as entry points.

I ran `src/transport/conversationList.acceptance.test.ts` with Jest only. Every failure comes from the missing feature, not from an import or fixture problem:

- **Validation:** `list_conversations` is invalid, so the valid cases fail. The expected result was `verdicts: [true, true]`, but the run returned `[false, false]` and no refusal named `limit` or `before`.
- **List:** with `history` enabled, the frame is answered with an `error` instead of `conversation_list`. The expected `types` were `['conversation_list']`, but the run returned `['error']`, and `listFor` was never called (`asked: []`).
- **UNSUPPORTED:** both the history-off case and the store without `listFor` get `INVALID_MESSAGE` instead of `UNSUPPORTED`.
- **SERVER_ERROR:** a rejecting `listFor` gets `INVALID_MESSAGE` instead of `SERVER_ERROR`.
- **Off the lock:** no `conversation_list` arrives while a turn is blocked, so the test timed out. The last frame it saw was `'timed out'`, not `'conversation_list'`.

I also added a `### 4.1.1 list_conversations` section to the protocol spec, with each statement citing its test by line number. I did not run `check:spec-links` or `check:spec-status`, and the repo has no reanchor script.

Left to the round's own tests:
- `before` cursor passthrough
- `StoreCannotList`
- the startup warning for history without resume
- the resume reconnect
- docs, CHANGELOG and version

One incidental finding: the run printed a "Cannot log after tests are done" notice from a late `disconnected` log line. It doesn't affect the red bar.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}