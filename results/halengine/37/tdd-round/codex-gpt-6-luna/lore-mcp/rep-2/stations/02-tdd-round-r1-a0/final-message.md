Implemented static schema compilation at registration, dynamic schema caching by object reference, and error formatting compatible with Ajv’s runtime errors. Updated the version to `0.4.0`, changelog, DoD, spec links, and the CI-reported lint issues.

The new cache test failed before the implementation and passed after the refactor. **Red tests: 1 (the test written this round); regressions: 0.** No acceptance tests, lint, or typecheck were run. The commit was pushed, the branch was already up to date with `main`, and it is not ahead of upstream.

Next: complete the remaining acceptance coverage and documentation updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"compile static schemas at registration and cache dynamic schemas by schema reference","tdd_next":"remaining acceptance coverage and documentation updates"}}