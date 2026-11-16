I wrote four acceptance tests for #144 in `src/transport/conversationList.acceptance.test.ts`. All four fail now, and the branch is pushed and level with its upstream. The strategy is `direct`: `createServer` plus a real WebSocket upgrade is already a seam, so no new module is needed.

I ran the file with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts`. Plain `npx jest` can't load the ESM sources. All four fail because the server answers a `list_conversations` frame with `INVALID_MESSAGE`, which is the ticket's claim that nothing delivers the list to a client.

- **Own list, newest first, foreign `userId` ignored:** expected `["conversation_list"]`, received `["error"]`.
- **`limit` reaches the store:** expected `["conversation_list"]`, received `["error"]`.
- **History not enabled:** expected `UNSUPPORTED`, received `INVALID_MESSAGE`.
- **Store with no `listFor`:** expected `UNSUPPORTED`, received `INVALID_MESSAGE`.

I did not write tests for the ticket's other criteria:
- Rejecting `listFor` answering `SERVER_ERROR` or `StoreCannotList`.
- A list request answered while a turn is streaming.
- Resume by id from a listed row.
- Validation bounds.
- The spec, doc and CHANGELOG items.

`.lore/dod.md` records the first group as facets for later rounds. I added no spec `validated by` links, and `scripts/spec-links/reanchor.mjs` doesn't exist in this repo.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}