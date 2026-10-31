Completed and pushed `9714908` (`docs: clarify beforeSession hook failures`).

- Documented the hook-failure guarantee and migration note.
- Fixed acceptance-test typing, assertion shape, and spec link.
- Reanchored shifted spec links caused by the prior test insertion.
- Ticked both remaining DoD facets.
- Local tests were not run: the only relevant test is the CI-only acceptance test.
- CI reported 0 red tests; its failures were typecheck/lint/traceability findings.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update specs and changelog for beforeSession failure behavior","tdd_next":"acceptance green"}}