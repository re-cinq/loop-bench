Committed and pushed one red-green-refactor round. The new test failed because a forbidden extra property was reported as `/`; the registry now reports `/secret` without exposing its value. The focused test is green, and the branch is up to date with `main` and its upstream.

This round had **1 red test I wrote** and **0 observed regressions**. The remaining facet is the unit tests and documentation listed in `.lore/dod.md`; CI will judge the acceptance tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Name the path of a property rejected by an explicit additionalProperties: false schema without exposing its value","tdd_next":"Add remaining unit tests and update documentation and changelog"}}