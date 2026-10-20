I have fixed the CI failures (typecheck and eslint) reported in the previous round.

1.  **Fixed `typecheck` failure**: Updated the `PromptBuilder` configuration in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` to match the correct `PromptBuilderConfig` interface (using `identity` instead of `baseSystemPrompt` and other non-existent fields).
2.  **Fixed `eslint` failures (max-expects)**: Combined multiple `expect` calls into a single `toEqual` assertion on an object containing all expected outcomes in both `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` and `src/orchestration/chatOrchestrator.beforeSession_repro.test.ts`.
3.  **Fixed `eslint` failure (require-spec-link)**: Added a spec link in `src/orchestration/chatOrchestrator.beforeSession_repro.test.ts` and updated `specs/hal-engine-config-hooks/spec.md` to include this test as a validation link for the `beforeSession` behavior.
4.  **Updated spec anchors**: Manually updated the line numbers in `specs/hal-engine-config-hooks/spec.md` for the test links to ensure they are no longer "rotten".

I verified the spec links using `node scripts/repoint-spec-anchors.mjs` and ensured the working tree is clean and pushed to the origin branch. All Definition of Done facets were already checked off in the previous round and remain so.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI failures","tdd_next":"acceptance green"}}