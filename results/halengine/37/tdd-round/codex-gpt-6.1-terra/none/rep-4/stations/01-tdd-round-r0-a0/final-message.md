Static tool schemas now compile at registration, and invalid schemas throw an error naming the tool. The round also adds Ajv and bumps the package version to 0.4.0.

The new test passed after failing as expected: **1 red test was mine, and 0 regressions were reported**. Acceptance tests were not run locally. The commit was pushed, the branch is up to date with `origin/main`, and it is not ahead of its upstream.

The Lore coverage graph was unavailable, and the repository’s test-list command does not expose a `spec` field; the test has an inline spec anchor and a spec citation. No unrelated smells were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"compile static schemas at registration","tdd_next":"cache validators for dynamic schemas"}}
