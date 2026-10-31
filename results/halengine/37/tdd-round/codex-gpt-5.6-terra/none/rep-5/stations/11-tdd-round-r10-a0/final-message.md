Implemented and pushed `ba8eef8`.

- Static schemas now undergo full schema-validity checking at registration.
- Added one focused red→green regression test.
- Fixed reported type configuration and re-anchored traceability links.
- Targeted test passed; filtered Jest run printed expected suite-wide coverage warnings.
- Red tests: 1 mine during red phase; regressions identified: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject malformed static schema constraints at registration even when runtime validation deliberately ignores that constraint","tdd_next":"Add the remaining registry/orchestrator tests and documentation updates"}}