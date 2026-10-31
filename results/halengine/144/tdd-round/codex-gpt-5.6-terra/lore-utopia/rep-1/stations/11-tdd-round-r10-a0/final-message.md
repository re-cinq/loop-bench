Delivered and pushed `1a40c2c` (`Fix list cursor validation`).

- Added a red/green test ensuring unknown cursor fields are stripped.
- Refactored validator dispatch and predicates to address all four CI lint findings.
- Ran only `src/transport/ws/validation.test.ts`: 6 passing.
- Did not run lint or acceptance tests locally per pod rules.
- CI red tests: 1 authored red test; regressions: 0.
- Branch is pushed and current with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Strip undefined nested list cursor fields and repair validator lint findings","tdd_next":"acceptance green"}}