Fixed and pushed the dynamic-schema test’s TypeScript inference regression in `dc7bdc8`.

- Targeted registry case passes (coverage warnings are expected for a single-file run).
- CI failures addressed: 1 ours, 0 regressions.
- Next facet: remaining registry/orchestrator tests and documentation updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair the dynamic-schema registry test fixture so it accepts the deliberately changed schema shape and typecheck can proceed","tdd_next":"Add the remaining registry and orchestrator unit tests, linked specs, and documentation updates"}}