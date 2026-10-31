Fixed and pushed CI repair commit `d782c3b`.

- Stabilized the acceptance fixture timestamp.
- Consolidated the Error-identity assertion to one expectation.
- Reanchored all shifted spec citations; `npm run spec:names` passes.
- Formatter ran. No acceptance tests or lint ran locally, as required.
- CI test failures: 0 mine, 0 regressions (the prior failures were lint/spec-name checks).
- No unrelated smells changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI traceability and deterministic-test hygiene","tdd_next":"acceptance green"}}