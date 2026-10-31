Committed and pushed `9bb9395` (`Fix tool validation error typing`).

- Added focused wrong-type validation regression coverage; it passes.
- Fixed Ajv error typing that blocked CI typecheck.
- Removed CI-flagged duplicate unit scenarios and updated spec links.
- Did not run acceptance tests, typecheck, lint, or full suite per instructions.
- CI red tests: 0 mine; 1 prior acceptance regression reported by CI.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair Ajv validation error typing and remove duplicate unit coverage","tdd_next":"Add remaining unit tests, documentation, changelog, and version-bump facet"}}