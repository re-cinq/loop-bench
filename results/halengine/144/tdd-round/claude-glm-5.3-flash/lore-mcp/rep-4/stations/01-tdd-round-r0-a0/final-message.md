The round is delivered: pushed at `28fe18f`, branch up to date with its upstream, `origin/main` merged in with no drift.

## Round report

**Facet closed** — the transport answering `list_sessions` over the WebSocket: all five dod facets (types, validation, threading, dispatch, docs). Validation alone would have left CI's red byte-identical — unknown types already answer `INVALID_MESSAGE`, so all eight malformed frames passed while only the accept-and-answer half failed — so the round drove the dispatch end to end with one test.

**The test I wrote and ran** — `messageHandler.test.ts` › `a conversation list › answers list_sessions for the user on the session, forwarding limit and before with dates serialised and a frame userId ignored`:
- RED for the expected reason: `Unknown message type: list_sessions`, `listFor` never called; the 54 pre-existing tests in the file stayed green.
- GREEN with the least code (`messages.ts` +3 interfaces/two union members, `validation.ts` case, `sender.ts` `sendSessionList`, `messageHandler.ts` dispatch beside `ping` off the lock, `createServer.ts` one-line wiring, `index.ts` re-exports).
- REFACTOR: collapsed the twice-written `error instanceof Error ? …` into `messageOf` (the name `connectionHandler.ts` already uses); left `helpers.ts`' `SESSION_ID_PATTERN` alone — it is the stricter charset check for a server-issued `?sessionId=`, not the same rule as my cursor length bound. Bar re-run green after the refactor and after prettier (58 passed, the two touched unit files).

**Acceptance tests**: not run here — CI's to run on the push. No CI verdict existed for this branch yet (`lore_get_ci_failures` returned branch-not-found, no round brief), so I have no regression count to report; locally nothing red is mine and nothing green went red.

**Traceability**: added § 4.3 `list_sessions` and § 5.9 `session_list` to the protocol spec with citations; ran the repo's anchor tooling, which repointed **34 drifted citations across 7 spec files** (my one import line shifted `messageHandler.test.ts` citations, and the previous round's conversation-list anchors were stale by 5–6 lines). Verified all anchors land on `it(` declarations.

**Divergences I did not act on** (the dod + committed RED tests are the bar; I edited no acceptance test): the ticket's later-amended criteria — a `transport.history` opt-in flag, an `UNSUPPORTED` error code, `StoreCannotList` — do not exist in the brief or the tests, which require the feature always-on and an empty `session_list` for a store without `listFor`. Also still open from the ticket text, outside the dod's facets: the CHANGELOG entry, MINOR version bump, `example/full-config.ts` + `npm run docs:fix`, the streaming-concurrency and reconnect-with-`?sessionId=` criteria, and the messages compile fixture. Smells noted, unfixed: `messageOf` now duplicated between `messageHandler.ts` and `connectionHandler.ts` (rule of three not met), and `readCursor`'s string-as-error shape is a second, smaller convention beside `ValidationResult`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"dispatch list_sessions over the WebSocket off the lock — types, validation, threading, handling, and the protocol-spec statements (all five dod facets)","tdd_next":"acceptance green, else the failure CI names; if green, the ticket-level extras: CHANGELOG, MINOR bump, docs § Conversation list"}}