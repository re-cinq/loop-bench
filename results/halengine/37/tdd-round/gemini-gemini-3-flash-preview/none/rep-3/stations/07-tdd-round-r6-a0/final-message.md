I have fixed the CI failures and lint errors reported in the previous round.

### Changes:
- **`src/orchestration/chatOrchestrator.test.ts`**:
    - Fixed a `TypeError: Cannot read properties of undefined (reading 'messages')` by moving the inspection of `capturedParams` to occur after `await orchestrator.processMessage(...)`.
    - Resolved the `re-lint/declare-near-use` error by moving the `orchestrator` declaration closer to its first use.
- **`src/orchestration/tools/registry.ts`**:
    - Improved AJV error path extraction to be more human-readable and robust. It now removes the leading slash (turning `/field` into `field`) and uses dot notation for nested properties. This change ensures that the field name is correctly identified in error messages, addressing the `mentionsField: false` failure in `registry.acceptance.test.ts`.
- **Traceability**:
    - Ran `scripts/repoint-spec-anchors.mjs` to ensure all spec links are up to date, although most were skipped as the spec is new and not yet in `main`.
- **Formatting**:
    - Ran Prettier on all modified files to ensure compliance with workspace standards.

I verified the changes by running the unit tests in `src/orchestration/tools/registry.test.ts`, which now pass with the new error message format. The acceptance tests are deferred to CI as per instructions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI regressions and stabilize implementation","tdd_next":"acceptance green"}}