Fixed the reported required-property path failure for legacy validator errors and pushed commit `6d9d2fa`. The focused test passed after first reproducing the failure. The branch is up to date with `origin/main` and its upstream.

The reported red test was ticket-authored; no pre-existing regressions were identified. The provider-factory failure remains unverified because the CI log was truncated and the CI gateway could not find the branch. No unrelated issues were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair legacy validator required-property paths","tdd_next":"Investigate the truncated provider-factory CI failure and complete remaining CI repairs"}}