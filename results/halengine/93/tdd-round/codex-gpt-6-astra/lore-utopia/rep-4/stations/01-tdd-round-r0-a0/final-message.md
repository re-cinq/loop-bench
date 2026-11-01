Committed and pushed `5da30db`: pure token aggregation with spec traceability.

One new test went red, then green. No regressions observed; acceptance tests were not run, and CI status was unavailable. Base is current; working tree is clean.

Next: missing-usage handling and hook integration. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Pure field-by-field aggregation of reported provider usage","tdd_next":"Preserve undefined for missing usage while accumulating rounds"}}