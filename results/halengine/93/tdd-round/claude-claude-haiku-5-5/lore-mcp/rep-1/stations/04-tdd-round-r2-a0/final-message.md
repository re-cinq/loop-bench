The CI findings are fixed and pushed, but no new facet was closed this round. I ran no tests here: the brief's acceptance tests are CI's to run, and I only changed the spec.

- **eslint `re-lint/require-spec-link` on `chatOrchestratorUsage.acceptance.test.ts:67`:** the spec had that test's `#L67` citation followed by a second sentence, so it was not in the statement's trailing parenthetical. I split the bullet so each citation closes its own statement.
- **spec-links on `specs/hal-engine-config-hooks/spec.md:29`:** same cause, same fix. The `#L44` and `#L29` citations were already correct.

Commit `b36b6c9` is pushed to `loop-bench/93`. The branch is in sync with its upstream, and the `origin/main` merge produced nothing new. `prettier --check` passes on the spec.

Test ownership for the red verdict: 0 red tests were mine to write this round, and 0 regressions. Both findings were lint and link checks on the tests and spec from earlier rounds.

I left `.lore/dod.md` unticked: the open facet is "Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit." The next round takes that facet.

Unrelated smells I noticed and did not touch: none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI findings: spec link citation fixed for acceptance test line 67 and spec-links misplacement at spec.md:29","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}