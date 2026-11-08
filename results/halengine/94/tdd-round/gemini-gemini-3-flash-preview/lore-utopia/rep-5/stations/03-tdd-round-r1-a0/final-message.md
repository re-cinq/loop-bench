I have fixed the CI failures and spec link issues introduced in the previous round.

### Changes:
- **`src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`**:
    - Fixed `PromptBuilder` instantiation by using the correct `identity` property instead of the non-existent `baseSystemPrompt`.
    - Consolidated multiple `expect` calls into a single assertion to satisfy the `re-lint/max-expects` ESLint rule.
- **`src/orchestration/chatOrchestrator.test.ts`**:
    - Consolidated `expect` calls in the `beforeSession` error test to satisfy `re-lint/max-expects`.
    - Verified that all lifecycle hooks continue to pass and maintain their execution order.
- **Spec Documentation**:
    - Updated `specs/hal-engine-config-hooks/spec.md` to link both the acceptance test and the unit test to the relevant guarantee, satisfying `re-lint/require-spec-link`.
    - Repointed 22 "rotten" spec links in `specs/hal-engine-architecture/spec.md`, `specs/hal-engine-config-hooks/spec.md`, and `specs/hal-engine-tool-input-validation/spec.md` that were invalidated by the line shifts in `src/orchestration/chatOrchestrator.test.ts`.
- **Validation**:
    - Verified that both the unit tests and the acceptance test pass locally.
    - Successfully ran the `repoint-spec-anchors.mjs` script to ensure all anchors land on correct test declarations.

There were 0 regressions; the red build was caused by type and lint errors in the newly added tests, all of which are now resolved.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fixed CI failures and spec links for beforeSession hooks","tdd_next":"acceptance green"}}