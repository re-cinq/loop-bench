Fixed and pushed `5e6aa53` (`Fix legacy tool validation paths`).

- Normalized legacy AJV dotted `dataPath` values to JSON Pointer paths.
- Fixed AJV options typing and refactored unit assertions for prior lint findings.
- Targeted registry test passed after the red-green-refactor cycle.
- Red tests: 1 mine, 0 regressions.
- Next facet: remaining unit tests and documentation updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Preserve nested required-property paths reported through legacy dotted dataPath values","tdd_next":"Add remaining unit tests and documentation updates"}}