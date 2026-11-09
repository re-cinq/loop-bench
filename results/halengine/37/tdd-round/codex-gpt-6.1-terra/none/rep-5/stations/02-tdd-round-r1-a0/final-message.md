Committed and pushed the static-tool validation round. A missing required field now returns a rejection before the executor runs. The focused registry test passed after first failing as expected; it contained **one new red test and no observed regression tests** in the local run.

I also addressed the reported Ajv import, error-cause, citation, and acceptance-test lint findings. The previous CI report included a provider test failure, but its excerpt did not provide enough detail to identify the cause. CI will judge the pushed branch; the full suite, lint, and typecheck were not run locally.

The branch is up to date with `origin/main` and its upstream. Dynamic schema caching and validation remain for the next round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid input for static tool schemas","tdd_next":"Cache dynamic schema validators and validate dynamic tool input"}}