Implemented and pushed `47a8131`.

- Added a red/green unit test proving unsupported constraints such as `minLength` do not block execution.
- Restricted schema validation to required/type/enum recursively.
- Resolved the prior test lint findings by removing duplicate fixture structure and consolidating assertions.
- Updated linked specification anchors and DoD facet.

The focused Jest assertion passed; its wrapper reported only repository-wide coverage-threshold failures from running one test. No regressions reported; 1 red test was mine.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Limit input validation to required, declared property types, and enum","tdd_next":"Add the remaining registry and orchestrator unit tests and documentation updates"}}