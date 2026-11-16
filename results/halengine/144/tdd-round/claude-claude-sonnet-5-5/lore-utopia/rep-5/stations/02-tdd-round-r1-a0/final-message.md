Round pushed. I ran only the tests that were safe to run here, and the three acceptance tests still need CI's verdict.

- **Facets closed:** `sessionStore` is now passed into `createMessageHandler` and `createServer`. `list_sessions` is handled off the lock beside `ping`. The user comes from `session.userId`, and `limit` and `before` are forwarded as sent. A store with no `listFor` gets an empty `session_list`. A failing `listFor` is logged on `ws` with the session id, user id and error message, and answered `SERVER_ERROR` with no store detail. The protocol spec has new §4.3 and §5.9.
- **Where this differs from the ticket:** `.lore/dod.md` and the red acceptance tests use `list_sessions` and `session_list`, so I followed them over the ticket's `list_conversations` and `conversation_list`. The empty-list answer for a store without `listFor` also follows the acceptance test, not the ticket's `UNSUPPORTED` error.
- **Tests run:** `validation.test.ts`, `sessionResume.test.ts` and `messageHandler.test.ts` pass, 92 tests. I wrote no new test this round.
- **CI findings I addressed:**
  - **Duplicate code:** `eventually` and `delegatingTo` now live in `wsTestSupport.ts`, and `sessionResume.test.ts` imports them.
  - **Spec links:** the validation test and the acceptance tests now have spec links. `check-spec-anchor-names` and `check-spec-links` pass, and the acceptance-test anchors were repointed to the right lines.
  - **Changelog:** an entry is added under Unreleased.
  - **Still unconfirmed:** I did not run the linter, typecheck or full suite, so only CI can say whether the `eslint` and `test` failures are gone.
- **Regressions:** none known. The one red test I wrote before this round was not a regression.
- **Left alone:** the protocol spec's `Status` row still reads "In Progress". `transport.history`, `StoreCannotList` and the docs and example changes the ticket asks for are not built either.
- **Merge and push:** `origin/main` was already merged and the branch is not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"handle list_sessions in messageHandler with sessionStore threaded through createServer; spec docs, changelog, test-helper dedupe","tdd_next":"acceptance green"}}