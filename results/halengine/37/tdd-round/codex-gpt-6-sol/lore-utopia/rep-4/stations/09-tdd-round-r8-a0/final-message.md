Committed and pushed the round. The new test went red for object enum choices, then green after rejection messages began rendering those choices as JSON. I also fixed the prior CI lint finding and updated the spec link. The branch is up to date with `main` and its upstream.

The registry test file passed locally. Red tests from this round: 1; regressions: 0. The remaining documentation and unit-test facet is still unchecked; CI will judge the push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI's enum formatting lint finding and render object enum choices as JSON in rejection results","tdd_next":"Add remaining unit tests, spec links, documentation, example, ADR, and changelog updates"}}