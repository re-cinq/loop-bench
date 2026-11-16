This round fixed the spec-link side of the red build and pushed it. I couldn't read CI's verdict, so the `test` job and most of the eslint log are unchecked. `lore_get_ci_failures` returned 404 "branch not found" for `loop-bench/144`, so I worked from the brief and the repo's own check scripts.

- **Cause:** the previous round removed about 29 lines from `src/transport/sessionResume.test.ts`. That shifted every `#Lnn` citation in the session-resume and websocket-protocol specs by one line.
- **Fix:** `check-spec-anchor-names --fix` re-anchored the citations. It reported 29 findings before and now reports 800 citations that all name the test they point at. `check-spec-links` and `check-spec-status` are also clean.
- **One by-hand change:** `validation.test.ts` used `it.each(...)('... %j')`, and the checker can't match a templated title. I turned it into a plain `it` with a loop and updated the spec citation to the static title.
- **Tests run:** only `validation.test.ts`, under Jest. This repo uses Jest, not Vitest, and the file passes 5 of 5. I did not run the acceptance tests.
- **Branch state:** the branch merged cleanly with `origin/main` (already up to date) and is not ahead of its upstream.

The eslint `require-spec-link` findings I saw were on `sessionResume.test.ts` and came from those same shifted anchors, so they should clear too. The `test` job failure is the part I can't explain. If it's still red, the next round needs its log.

This round closed no new facet. The three red acceptance tests in `.lore/dod.md` are also written for `list_sessions`/`session_list`, not the ticket's `list_conversations`/`conversation_list`. That may be the real gap, and the next round should check it. It was not touched this round, and `.lore/dod.md` is unchanged.

Red tests that were mine: one, the templated-title test. Regressions: none that I could identify.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair CI verdict: re-anchor shifted spec links and give the list_sessions rejection test a static title","tdd_next":"read the CI log for the red test job; reconcile the acceptance tests' list_sessions/session_list naming with the ticket's list_conversations/conversation_list"}}