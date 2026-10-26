The fix is pushed. Both CI failures were caused by the spec citation pointing to `#L14` instead of `#L26` — the acceptance test was inserted with 12 lines of imports/setup above the `it(...)` call, shifting it to line 26. Running `npm run spec:names -- --fix` repointed the citation automatically, which also satisfies the ESLint `require-spec-link` rule (it checks that the cited line falls within the test's line span).

No regressions were introduced; 0 red tests were mine, 0 were regressions. The DoD facets are already all ticked from the previous round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"reanchor spec citation to match actual test line","tdd_next":"acceptance green"}}