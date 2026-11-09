Committed and pushed static schema compilation at registration, including the Ajv dependency and minor version bump. Invalid static schemas now throw an error naming the tool.

The new test failed before the change and passed afterward. The acceptance tests were not run locally. Lore had no CI record for this branch, so the previous CI red-test counts are unknown; the local red phase had **one new test failure and zero observed regressions**.

No unrelated issues were identified. The next round can add dynamic-schema caching and reuse the static validator during execution.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"compile static tool schemas at registration","tdd_next":"cache dynamic schema validators and reuse static validators during execution"}}