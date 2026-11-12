I have refactored the `catch` block in `src/orchestration/chatOrchestrator.ts` to extract the error normalization logic into a helper function `normalizeError` at the bottom of the file. This fixes the `re-lint/no-nested-if` and `re-lint/prefer-early-return` eslint errors reported from the last round.

I ran `prettier` on the changed file, committed, and pushed the branch to origin. No tests were executed in this pod, as the issue only required fixing linter errors.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fixed CI failures","tdd_next":"acceptance green"}}