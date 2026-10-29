Committed and pushed `5ea2c3c`. The new dynamic-schema test failed, then passed after validator caching and input validation; it stayed green after refactoring. I also addressed the CI brief’s named type and lint findings. The branch is up to date with `main` and its upstream.

Red tests: **1 mine, now green; 0 regressions identified.** CI will judge the acceptance tests. `lore-query-trace` was unavailable in this pod.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Cache function-valued definition schemas by object reference","tdd_next":"Validate input before invoking the executor and document rejection behavior"}}