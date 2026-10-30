Completed and pushed one TDD round.

- Facet closed: AJV runtime dependency and MINOR version bump to `0.4.0`.
- Added one unit test for missing required input; red for intended behavior, then green.
- Test result: 1 passed.
- Red tests: 1 written this round, 0 regressions.
- Next facet: static registration-time compilation and function-schema validator caching.
- Branch is synchronized with upstream and current with `origin/main`.
- Unrelated finding left untouched: npm reports 14 dependency vulnerabilities.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ajv to dependencies with non-mutating validation options and bump the package version MINOR","tdd_next":"Compile static schemas at register time and cache function-valued schemas by object reference"}}