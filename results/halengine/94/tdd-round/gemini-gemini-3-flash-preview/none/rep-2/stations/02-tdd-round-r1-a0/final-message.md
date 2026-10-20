I have fixed the `typecheck` and `eslint` errors in the `beforeSession` acceptance test that were reported by CI after the previous round.

### Changes Made:
- **src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts**:
    - Corrected the `PromptBuilder` configuration by replacing the non-existent `baseSystemPrompt` and other fields with the valid `identity` property.
    - Refactored the test to use a single `expect` call by capturing the result and error in an object, satisfying the `re-lint/max-expects` rule.
- **specs/hal-engine-config-hooks/spec.md**:
    - Updated the line number for the `beforeSession` throw validation link to #L34 to match the actual position in the test file after formatting.

I verified the fix by running the specific acceptance test locally, which passed. I also ran `scripts/repoint-spec-anchors.mjs` to ensure all spec links are up to date. The changes have been committed and pushed to the branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"runs onError and afterSession when beforeSession throws","tdd_next":"acceptance green"}}