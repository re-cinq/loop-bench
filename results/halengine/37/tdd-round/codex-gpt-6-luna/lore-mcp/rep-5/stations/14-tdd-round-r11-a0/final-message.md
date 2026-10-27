Added a focused test for `additionalProperties` rejection paths and updated validation to name the rejected property without exposing its value. Also repaired the retry test’s missing spec link and updated the affected line references.

The new test failed first and passed after the change. **Red tests: 1 written by me; 0 named regressions.** The prior CI brief’s test failure section was truncated to a coverage table; Lore could not find the branch, so I couldn’t identify any specific failing test there. I did not run the full suite or other CI checks.

Committed and pushed `e87df1e`; `origin/main` was already up to date, and the branch is clean and not ahead of its upstream. The next facet is the remaining registry tests, spec links, and documentation. No unrelated smells were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Disallowed additionalProperties rejections name the property without exposing its value","tdd_next":"Remaining registry tests, spec links, and documentation"}}