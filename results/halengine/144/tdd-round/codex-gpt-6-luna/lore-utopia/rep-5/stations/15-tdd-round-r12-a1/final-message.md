Added a streaming concurrency test and updated the generated getting-started docs, changelog, protocol spec, and DoD. The test passed; it did not produce a red phase because the handler already answered list requests outside the turn lock.

CI still reports `test` and `spec-names` failures. The brief’s log is truncated, and Lore could not retrieve this branch’s CI details, so I could not identify or count CI’s failing tests. Our test: **0 red**; regressions: **undetermined**. The branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Verify conversation-list concurrency, config threading, resume flow, changelog and generated getting-started docs","tdd_next":"acceptance green"}}