Round complete and pushed. Summary:

**What this round did (one red-green-refactor cycle, dod facet 2):**
- **RED**: one new unit test in `src/transport/ws/validation.test.ts` — `accepts a list_sessions limit and before cursor within the protocol and rejects a malformed one naming the field` — failed with `Unknown message type: list_sessions`.
- **GREEN**: a `list_sessions` case in `validateMessage` (non-negative integer `limit`, `before` cursor with 1–128-char `sessionId` and a parseable `updatedAt`, errors naming the field, unknown fields like `userId` stripped), plus `ListSessionsMessage` added to `src/types/messages.ts` additively (touching no existing line) and re-exported from `src/index.ts` and `src/types/index.ts`.
- **REFACTOR**: bound locals in the new validator; re-ran the test file — 4/4 green.

**Traceability:** the new test is cited on the conversation-list spec's validator statement (second citation, repo's established form); `npm run spec:names` would have failed on the branch — the previous round's three acceptance-test anchors were stale (L87/L129/L161 vs actual L93/L134/L163), so I repointed them with the repo's own fixer. Acceptance tests were not run — CI judges those. Prettier ran over the changed files only; no lint/typecheck/build in this pod.

**Notes:** lore tooling (`lore_get_ci_failures`, `lore-query-trace`) isn't surfaced in this pod — I substituted a grep to learn `validation.ts` was covered only by `validation.test.ts`. Red tests attributable to this round: 0; regressions: 0 (CI's verdict on the push will confirm). Un-acted observations: the branch's committed contract (`list_sessions`/`session_list`, empty list when a store lacks `listFor`, no `transport.history` opt-in in the dod facets) deliberately diverges from the ticket text (`list_conversations`/`conversation_list`, `UNSUPPORTED`, opt-in flag) — I followed the brief and committed tests, leaving the divergence untouched.

**Next facet:** thread `sessionStore` into `createMessageHandler` and answer `list_sessions` off the lock (dod facets 3+4), which closes the outgoing frame types of facet 1 and takes acceptance tests 1–2 toward green.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"validate list_sessions frames in validation.ts, with ListSessionsMessage added to the protocol union","tdd_next":"thread sessionStore into createMessageHandler and answer list_sessions with session_list (dod facets 3+4)"}}