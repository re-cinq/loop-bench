Committed and pushed `f328c6f`. Dynamic schemas now validate per call with cached validators; CI-reported Ajv and assertion issues were repaired.

One new test went red, then green after refactoring. No regressions observed locally; acceptance tests remain CI’s responsibility. Branch is current with `main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate current dynamic schemas and cache validators by schema reference; repair CI findings","tdd_next":"Pin validator reuse and compilation counts, then complete validation privacy coverage and documentation"}}