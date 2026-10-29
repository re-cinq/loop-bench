Completed and pushed one red–green–refactor round. Static tool schemas now compile at registration; an invalid schema throws an error naming the tool. Ajv is a runtime dependency, and the package version is 0.4.0.

The new test failed before the change and passed after the refactor. No acceptance tests were run locally. The branch is pushed and up to date with `main`. This round leaves 0 red tests of its own and 0 known regressions; CI has not yet reported on the push. The next facet is caching validators for function-valued definitions. The requested trace query was unavailable in this pod.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static tool input schemas at registration","tdd_next":"Cache validators for function-valued tool definitions by schema object"}}