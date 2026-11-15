I wrote the remaining documentation facet this round and pushed it. No tests ran here: the facet was documentation only, so there was no new test to write or run.

**Starting point:** the round brief's red build (9 eslint errors) is for commit 5ffa75c. The branch tip, 9a6f498, was already pushed and changes exactly the three files those errors name. CI hasn't reported on that commit yet, so it is the next build that will show whether the errors are gone. 0 red tests were mine and 0 were regressions; the failures were all lint findings.

**What I changed:**
- **`specs/hal-engine-websocket-protocol/spec.md`:** added § 4.3 `list_sessions` and § 5.9 `session_list`. They cover:
  - the field tables and the summary row's fields;
  - the rule that the user id comes from the authenticated connection and never from the frame;
  - which frames are rejected with `INVALID_MESSAGE`;
  - the empty list when the store has no `listFor`, and the `SERVER_ERROR` behaviour;
  - the GDPR note pointing at #41.

  Each statement links to an existing test at its current line.
- **`specs/hal-engine-conversation-list/spec.md`:** three links to the acceptance tests pointed at old lines (L93/134/163) and now point at the right ones (L87/128/157). There is no `reanchor.mjs` script in this repo, so I checked them by hand.
- **`.lore/dod.md`:** ticked the last facet, so all five are now ticked.
- I tried Prettier on the spec. It reformatted tables throughout the file, and this repo only formats `{src,scripts,smoke}/**/*.ts`, so I reverted that. The commit adds only my new sections.
- Pushed. Merging `origin/main` changed nothing, and `git status` shows the branch level with its upstream.

**Things I noticed but didn't touch:**
- **The ticket and `.lore/dod.md` disagree.** The ticket says `list_conversations`/`conversation_list`, an opt-in `transport.history` flag, an `UNSUPPORTED` error, `StoreCannotList`, and a `limit` of 1–200. The dod uses `list_sessions`/`session_list`, has no opt-in, and answers an empty list when the store has no `listFor`. I followed the dod as the bar, but the ticket's acceptance criteria aren't met until that's settled.
- **The last round edited an acceptance test.** Commit 9a6f498 flattened the frame handler in `conversationList.acceptance.test.ts` to clear a lint error. The assertions didn't change, but that edit goes against the rule against editing acceptance tests.
- **The protocol spec's error-code table** doesn't mention that `list_sessions` can get a `SERVER_ERROR`, and its `Status` row still reads `In Progress`.
- **Still owed from the ticket:** the `CHANGELOG`, `example/full-config.ts` and `docs:fix` items aren't on the dod's checklist.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document list_sessions and session_list in the websocket-protocol and conversation-list specs","tdd_next":"acceptance green"}}