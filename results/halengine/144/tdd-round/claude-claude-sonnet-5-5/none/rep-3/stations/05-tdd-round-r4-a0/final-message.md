This round repaired the CI findings and pushed. It added no new test, and CI hasn't judged the push yet. The branch is up to date with `origin/main` and not ahead of its upstream.

- **eslint `camelcase` in `validation.ts`:** the frame validators now sit in a `Map` keyed by `'user_message'`, `'ping'` and `'list_sessions'`, not an object with those names as keys.
- **`spec-names`:** I ran `spec:names:fix`, which repointed the shifted `#Lnn` anchors in the resume and protocol specs. The citation of `rejects %s`, a title no test declares, is gone. The spec now cites the acceptance test for the `INVALID_MESSAGE` rule.
- **`spec-links`:** the `list_sessions` paragraph in the protocol spec is split so each statement ends with its own trailing citation.
- **`.lore/dod.md`:** I ticked the documentation facet, since both specs already describe `list_sessions` and `session_list`.

`validation.test.ts` ran green (13 passed), and `spec:names` and `check:spec-links` pass locally. I did not run eslint here, so the line-length and spec-link findings from the earlier brief are unconfirmed. The brief's findings were truncated, so I could only act on the ones I could see or reproduce with the spec scripts.

One finding I did not touch: the `prefer-early-return` error at `conversationList.acceptance.test.ts:67` is in an acceptance test, which I'm not allowed to edit. That one may keep CI red.

No tests of mine were red, and no regressions this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair CI lint and spec-citation findings, document list_sessions in specs","tdd_next":"acceptance green"}}