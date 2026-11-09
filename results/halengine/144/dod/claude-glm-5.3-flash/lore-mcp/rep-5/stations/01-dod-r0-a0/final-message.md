Done. The branch is pushed, up to date with `origin/loop-bench/144`, and `origin/main` merged clean (already its base — no conflicts).

## Triage: `direct`

The seam exists: `createServer` is the real entry point a consumer wires (real upgrades over real sockets, the established harness in `sessionResume.test.ts`/`wsTestSupport.ts`), and `validateMessage` is the validator's real entry point. Today a `list_conversations` frame is answered `error INVALID_MESSAGE` — the ticket's claim ("It does not give a **client** anything") observed directly. No production code was written.

## The red bar — actual failure output

Command run (only this file): `node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts` → **Tests: 7 failed, 7 total**.

- `validateMessage({type: 'list_conversations'})`:
  ```
  -   "data": Object { "type": "list_conversations" },  "valid": true,
  +   "error": "Unknown message type: list_conversations",  "valid": false,
  ```
- Happy path, ordering, and resume-journey tests (real socket):
  ```
  no conversation_list frame arrived; the frames were ["connected","pong","error"]
  ```
  and while a turn was streaming: `the frames were ["connected","pong","entry_upsert","entry_upsert","entry_delta","error"]`
- Refusal paths: `Expected: "UNSUPPORTED" / Received: "INVALID_MESSAGE"` — the engine has no list case at all, so the opt-in and unsupported-store answers are absent too.

Every failure is the absent behaviour, not a typo or missing fixture. The five tests in `src/transport/conversationList.acceptance.test.ts` pin: the validator contract (incl. the amended two-half cursor), the connecting user's own newest-first list with ISO times and no `stream_end` (incl. the amendment that the connection's own conversation is listed), the forged-`userId` regression with `listFor`'s recorded argument carrying `ws.userId` and the frame's `{limit, before}`, every unanswerable request answered `UNSUPPORTED`/`SERVER_ERROR` with no list and no leaked store detail or user content (socket stays open, failure logged with the session id), the answer arriving off the lock before the streaming turn's `stream_end`, and an id from the list reopening the conversation over the existing resume path.

## Notes for the next round

- `.lore/dod.md` carries the strategy, checkboxes, and facets (messages.ts additive-only, `UNSUPPORTED`/`StoreCannotList`, config threading, spec citations pointing at this test file, changelog/docs via `example/full-config.ts` + `npm run docs:fix`, MINOR bump, `npm run verify`).
- `StoreCannotList` is deliberately **not** imported by the acceptance file — it doesn't exist yet, so the import would fail the whole file for the wrong reason. It's a facet with its own unit test beside the handler.
- One cast site: `{...} as EngineOptions` (`HalServerOptions & {history?}`) keeps the file compiling while `history` is missing from `HalServerOptions`; once the option lands the compiler checks it for real. Pass it under any other name and the tests stay red on behaviour.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}