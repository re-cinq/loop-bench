Committed and pushed dynamic schema compilation caching in `af4665c`. The new caching test failed before the change and passed afterward. The branch is up to date with `origin/main` and its upstream.

The previous CI report named one branch-added failing test and one existing failing test, `providerFactory.test.ts`. The latter’s output was truncated, so its cause remains unverified. Acceptance tests and CI checks were not run locally.

The next facet is to validate input and return a rejection before invoking the executor.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"cache dynamic schema validators by object reference","tdd_next":"validate input and return schema rejections"}}