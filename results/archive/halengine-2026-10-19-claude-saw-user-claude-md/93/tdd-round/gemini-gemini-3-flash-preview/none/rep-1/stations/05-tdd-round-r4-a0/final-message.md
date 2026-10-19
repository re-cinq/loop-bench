I have completed the TDD round by addressing the ESLint failures reported by CI.

### Changes Made:
- **Refactored Tests:** Extracted a common `runTurn` helper function in `src/orchestration/usageAccumulation.test.ts` to eliminate significant code duplication between test cases, resolving `re-lint/no-duplicate-code` errors.
- **Added Spec Links:** Linked the previously untraceable tests in `src/orchestration/usageAccumulation.test.ts` to their corresponding statements in `specs/hal-engine-config-hooks/spec.md`, resolving `re-lint/require-spec-link` errors.
- **Updated Spec Anchors:** Adjusted existing spec links to account for line shifts introduced during refactoring.
- **Verification:** Confirmed that all 9 tests in `src/orchestration/usageAccumulation.test.ts` pass locally using Jest.
- **Formatting:** Applied Prettier to the modified files to ensure compliance with project standards.

The branch has been pushed and is up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix ESLint errors (duplication and spec links)","tdd_next":"acceptance green"}}