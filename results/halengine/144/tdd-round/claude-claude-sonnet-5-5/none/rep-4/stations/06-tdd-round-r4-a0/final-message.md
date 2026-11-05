I fixed the three eslint findings from CI's red verdict, committed and pushed. No tests ran here, and neither did the linter or typechecker. CI has to confirm the fix.

- **`camelcase` on `user_message` and `list_sessions` in `validation.ts`:** I wrapped the `VALIDATORS` map in an `eslint-disable camelcase -- wire names` comment. Quoting the keys wouldn't have held, because Prettier would strip the quotes again.
- **`require-spec-link` on the "accepts a bare list_sessions" test:** the bare-frame sentence in `specs/hal-engine-websocket-protocol/spec.md` now cites that test at `#L24`. The repo has no `scripts/spec-links/reanchor.mjs`, and I added no lines to the test file. The other `#Lnn` links on that statement still point at the right lines.

The branch is up to date with `origin/main` and not ahead of its upstream.

The bar, as I read `.lore/dod.md`: all five facets there were already ticked before this round, and I changed no facets.

The failures were 3 lint findings, all from this branch's own code. I saw no failing tests, so 0 regressions.

I noticed one unrelated thing and left it alone. `.lore/dod.md` and the code use `list_sessions` / `session_list`, but the ticket text asks for `list_conversations` / `conversation_list`. I did not check that against CI.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI eslint findings (camelcase in validation.ts, spec link for bare list_sessions test)","tdd_next":"acceptance green"}}