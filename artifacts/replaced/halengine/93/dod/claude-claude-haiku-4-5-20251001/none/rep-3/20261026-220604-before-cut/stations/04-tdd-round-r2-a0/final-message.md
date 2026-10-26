Branch is up to date. The push landed successfully. Here's what this round fixed:

**4 CI lint errors resolved:**
1. **`re-lint/no-duplicate-code`** (in both test files): Extracted `scriptedProvider`, `registryReturning`, and `TOOL_CALL` into a new shared `chatOrchestrator.testHelpers.ts` file, removing ~24 lines of duplicate code from both test files.
2. **`re-lint/callee-below-caller`** (acceptance test): Moved `createSession` to be declared after `runTurn`, which calls it.
3. **`re-lint/require-spec-link`** (orchestratorHelpers.test.ts): Added a spec statement in `specs/hal-engine-config-hooks/spec.md` that validates `accumulateUsage`'s field-by-field sum with a link to `orchestratorHelpers.test.ts#L29`.
4. Updated spec link line numbers for the restructured acceptance test (`#L61→35`, `#L78→52`, `#L91→65`, `#L107→81`, `#L119→93`).

**Unrelated smells noticed but not touched:** None.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix all 4 CI lint errors from previous push","tdd_next":"acceptance green"}}