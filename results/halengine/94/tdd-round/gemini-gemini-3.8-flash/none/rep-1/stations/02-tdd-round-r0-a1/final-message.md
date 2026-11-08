In this round, I closed the facet: `Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession.`.

- Moved the guarantee into the `Installing hooks through config` section of `specs/hal-engine-config-hooks/spec.md` with citations to both the acceptance test (`src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts#L40`) and the orchestrator unit test (`src/orchestration/chatOrchestrator.test.ts#L116`).
- Updated the `Measured semantics — out of scope` section to accurately state that two properties remain out of scope for that spec.
- Checked `.lore/dod.md` to tick the completed facet.
- Formatted modified files with Prettier, committed, and pushed the branch to origin.
- This round ran no unit tests here because it updated spec documentation without adding or modifying test code.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession.","tdd_next":"Document in the CHANGELOG what changes for an existing consumer."}}