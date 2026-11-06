A previous round had already finished this ticket's Definition of Done. I checked it rather than redoing it, and it holds: five acceptance tests, all failing because the feature isn't there yet. I committed nothing new.

**What's on the branch** (commit `d490ab5`, already pushed to `origin/loop-bench/144`):
- `.lore/dod.md` uses strategy `direct`. The tests go through the real entry points: `validateMessage`, and `createServer` over a real socket via `startEngineWith`.
- `src/transport/conversationList.acceptance.test.ts` holds the five tests.
- `specs/hal-engine-websocket-protocol/spec.md` now has five new statements, each linked to its test with a `validated by` citation.

**Red bar**, from `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/transport/conversationList.acceptance.test.ts`. A plain `npx jest` can't load this ESM file, so it needs the repo's own `npm test` invocation.
```
Tests:       5 failed, 5 total
```
Each one fails because `list_conversations` isn't a known frame yet:
- **Validator:** a bare `{type:'list_conversations'}` comes back invalid (`"bare": false`, `"paged": false`), and none of the bad inputs gets an error naming the field.
- **Own user's list:** the answer is `"error"` instead of `"conversation_list"`, and `listFor` is never called (`"calls": Array []`), where the test expects `[['u1', {limit: 10, before}]]`.
- **History off, or a store with no `listFor`:** the code is `"INVALID_MESSAGE"`; the test expects `"UNSUPPORTED"`.
- **A store that fails:** the code is `"INVALID_MESSAGE"`; the test expects `"SERVER_ERROR"`. The "store detail doesn't leak" and "socket stays open" checks already pass.
- **Not stuck behind a streaming answer:** only `["stream_end"]` arrives, with no `conversation_list` before it.

These are exactly the things the ticket says are missing: a client has no way to get its conversation list over the socket.

**Delivery:** `git status` shows `loop-bench/144...origin/loop-bench/144` with nothing ahead. `git log HEAD..origin/main` is empty, so the branch is already up to date with `main` and needed no merge.

**For the reviewer:** the claim quoted at the top of `dod.md` is a sentence from the ticket's "Why" section. It's verbatim, but the line that states the problem most directly is "It does not give a **client** anything: the browser holding the socket cannot reach the store". I left the file as it is.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}