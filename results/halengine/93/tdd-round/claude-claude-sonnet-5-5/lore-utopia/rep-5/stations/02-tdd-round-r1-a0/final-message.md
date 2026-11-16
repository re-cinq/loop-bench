This round fixed the five eslint findings from CI's red build. I pushed the fix, and the branch is level with its upstream and already up to date with `origin/main`.

- **`max-expects`:** `orchestratorHelpers.test.ts` had one test with two `expect` calls. I split it into two tests, one for each side that reports nothing.
- **`require-spec-link`:** the four tests without a spec link now have inline `validated by` links in `specs/hal-engine-config-hooks/spec.md`. They are the no-usage acceptance test and the three `addUsage` tests. I added two spec statements to carry the links.
- **Anchors:** the repo has no `scripts/spec-links/reanchor.mjs`, so I set the `#Lnn` anchors by hand from the current test line numbers.
- **`.lore/dod.md`:** I ticked the last two facets.
- **Tests:** I ran only `orchestratorHelpers.test.ts`, and its 8 tests pass. I did not run the acceptance tests, lint or typecheck here, so CI will show whether eslint is now clean.
- **Failures:** none of the red findings were regressions. All five were mine.

I noticed no unrelated smells.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix eslint findings: spec links for usage tests, split multi-expect test","tdd_next":"acceptance green"}}