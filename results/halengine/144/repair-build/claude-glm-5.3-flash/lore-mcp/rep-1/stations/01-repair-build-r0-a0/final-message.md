The push landed (`5cd4e67..940ebbc`), the working tree is clean, the branch is not ahead of its upstream, and `origin/main` (2926558) is already an ancestor of the branch — no drift, nothing further to merge.

## What was red and what I did

**`test` check** — the acceptance suite was red because the previous round had stopped at validation: nothing handled `list_sessions`. I implemented the handler (`src/transport/ws/messageHandler.ts`):
- `createMessageHandler` now takes the session store (`createServer.ts` passes `options.sessionStore`).
- `list_sessions` is answered off the per-session lock, beside `ping`: `listFor(session.userId, {limit, before})` — the user comes from the connection, never the frame (the validator already strips a client-supplied `userId`), and `{limit, before}` is passed even when `undefined`.
- Summaries are serialised to ISO-8601 strings; no `listFor` → `session_list` with `[]`; a rejecting `listFor` → one `error` frame with `SERVER_ERROR`, socket kept open, logged on the `ws` category with the session id, user id and the store's message.
- One race I had to fix properly: when `list_sessions` and `ping` arrive in one chunk, the synchronous pong could overtake the async answer. Non-turn answers are now chained per socket, so a ping cannot be answered before one still owed — verified deterministic over 7 clean full runs (218 tests across all 19 transport suites + toolDeadline).

**`eslint` check** — fixed all 8 findings without disabling anything:
- The three blocks duplicated between `conversationList.acceptance.test.ts` and `sessionResume.test.ts` moved into `wsTestSupport.ts` (`eventually`, `delegatingTo`, and a shared `closeClientsAndServers` teardown) and both suites import them.
- `askAfterConnect`'s wrapped happy path was flipped to guard clauses (`prefer-early-return`).
- `Array(9).fill(false)` became the repo's own `Array.from({length: 9}, () => false)` idiom (`no-flag-params`).

**Collateral verified, not broken**: the moved test code invalidated spec `#Lnn` anchors, so I ran the repo's own repairers (`repoint-spec-anchors.mjs`, `spec:names --fix`) and confirmed all four script gates clean locally (`spec:names` 795 citations, `repoint --check` stale 0, `check:spec-links` 0, `check:spec-status` 0). I also corrected the one CHANGELOG clause my change falsified ("nothing in the engine calls it yet"). Prettier was run over the changed `.ts` files only; eslint, typecheck and build were not run in this pod per its constraints — CI judges those.

One caveat for the record: in a single early run under heavy local parallel load I saw the conversation-list suite and one `malformedUpgrade` test fail transiently; neither reproduced in 13 later full/pairwise runs, the base commit shows the same post-teardown log noise, and the ordering guarantee I added is what removes the conversation-list race outright.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"list_sessions was validated but never answered (red test), and 8 eslint findings (duplicated test blocks, wrapped happy path, boolean fill literal) — handler implemented off the lock with per-socket answer ordering, shared helpers extracted to wsTestSupport, spec anchors repointed"}}