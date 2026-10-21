Fixed CI failures and traceability issues from the previous round.

1.  **Registry Implementation Fixes**: Corrected the `Ajv` import and constructor call in `src/orchestration/tools/registry.ts` to be compatible with `NodeNext` ESM resolution. Used a type-safe constructor cast to avoid `any` and satisfy linter/compiler requirements.
2.  **Test Suite Refactoring**: Updated `src/orchestration/tools/registry.test.ts` to address multiple ESLint violations:
    *   Consolidated `expect` calls in the static compilation test to satisfy the `max-expects` rule.
    *   Refactored mock call assertions to avoid member chains deeper than 2 hops, satisfying the `max-member-chain` rule.
    *   Added required spec link comments for traceability.
    *   Removed unused `Options` import.
3.  **Traceability Updates**: Manually repointed "rotten" spec links in `specs/hal-engine-tool-input-validation/spec.md` to match the updated line numbers in the test file, ensuring the build's traceability checks pass.
4.  **Verification**: Confirmed that `npm run typecheck` and `npm run eslint` pass in the `target` directory. Verified that the registry unit tests pass locally.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"address CI failures and fix spec links","tdd_next":"acceptance green"}}