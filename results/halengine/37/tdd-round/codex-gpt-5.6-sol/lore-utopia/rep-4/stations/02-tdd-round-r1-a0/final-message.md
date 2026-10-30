Completed and pushed commit `1a6d392`.

- Closed: static schema compilation with named errors and dynamic validator caching by schema identity.
- Added one focused test; it passed after implementation.
- Addressed all reported CI findings, including changelog and lint-safe test structure.
- Red tests: 1 ours, 0 regressions.
- Branch is synchronized with `origin/loop-bench/37`.
- Next facet: validation error contract, redaction, and `execute` doc comment.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static schemas at registration and cache dynamic validators by schema object reference","tdd_next":"Validate input with redacted field-and-constraint errors and add the execute spec comment"}}