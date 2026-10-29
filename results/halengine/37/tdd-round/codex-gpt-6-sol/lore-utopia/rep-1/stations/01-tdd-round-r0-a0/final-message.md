Committed and pushed the required-field validation round. The new test failed against the original behavior and passed after the change; I ran only that test file. The branch is up to date with `main` and its upstream.

Red tests: 1 written this round, 0 regressions. Next facet: compile static schemas at registration and cache dynamic schemas. I found no unrelated smells to report.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate tool input before invoking the executor","tdd_next":"Compile static schemas at registration and cache dynamic schemas by object reference"}}