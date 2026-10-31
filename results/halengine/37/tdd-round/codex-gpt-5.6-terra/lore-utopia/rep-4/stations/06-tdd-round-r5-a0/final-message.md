Implemented and pushed `e34b938`.

- Added nested wrong-type path coverage and trace link.
- Preserved Ajv strict settings while fixing type compatibility and supporting `dataPath`.
- Repaired reported registry-test lint issues.
- Ran only `registry.test.ts`: 5 passed.
- CI-red tests: 0 written this round; 0 regressions. No unrelated changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair the CI-reported Ajv option typing, validation-path compatibility, and registry-test lint findings","tdd_next":"Add remaining unit/orchestrator tests and documentation updates"}}