Implemented and pushed the reported repair in commit `4aeb124`. The branch is up to date with `origin/main` and its upstream.

`npm run test:coverage -- --runInBand` reported **69 passing suites and 696 passing tests**, but Jest also reported a disconnect log after tests completed. That leaves the local test run’s clean result uncertain. Lint and the build were left to CI as instructed.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"Coverage run reported all 696 tests passing but also reported a late disconnect log; CI must judge the pushed repair."}}