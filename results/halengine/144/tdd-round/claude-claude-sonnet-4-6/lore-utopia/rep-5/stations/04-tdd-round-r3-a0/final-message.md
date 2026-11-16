The round fixed both CI failures from the previous push:

- **spec-names**: 31 stale spec anchor citations in `specs/hal-engine-session-resume/spec.md`, `specs/hal-engine-conversation-list/spec.md`, and `specs/hal-engine-websocket-protocol/spec.md` were repointed to the correct line numbers using `npm run spec:names -- --fix`. Test insertions in prior rounds had shifted line numbers without updating the citations.
- **eslint require-spec-link**: The 6 tests flagged with missing spec links in `sessionResume.test.ts` (lines 162, 283, 333, 394, 402, 478) were actually cited in the spec — the citations just pointed to old stale line numbers, so the ESLint rule couldn't find them. The `--fix` corrected the anchors and the citations now resolve.

No smells noticed worth naming; all DoD facets remain ticked. 0 regressions caused by this round; 0 new tests written (this was a pure CI-fix round with no logic change).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix stale spec anchor line numbers (eslint + spec-names CI failures)","tdd_next":"acceptance green"}}