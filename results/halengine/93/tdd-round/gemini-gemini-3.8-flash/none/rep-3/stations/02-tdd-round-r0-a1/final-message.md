Closed facet: "Sum each token field only for provider rounds that report usage, preserving `undefined` when none do."

- Added unit test `sums token fields only for provider rounds that report usage, preserving undefined when none do` in `src/orchestration/chatOrchestrator.test.ts`.
- Added traceability citation in `specs/hal-engine-architecture/spec.md` and updated shifted link in `specs/hal-engine-tool-input-validation/spec.md`.
- Verified that all 591 spec anchor citations name their target tests and all doc blocks match invariants.
- Ticked facet in `.lore/dod.md`.
- Unrelated smells noted: Running Prettier across markdown files inserts a blank line between `<!-- doc-block: ... -->` comments and typescript code fences, which fails `scripts/check-doc-blocks.mjs`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do.","tdd_next":"Preserve the unchanged no-tool regression guard, receives collected response text and usage, in src/orchestration/chatOrchestrator.test.ts."}}