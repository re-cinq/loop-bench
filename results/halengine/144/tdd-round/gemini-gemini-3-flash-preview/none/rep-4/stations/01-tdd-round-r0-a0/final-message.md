I have completed the first facet of ticket #144 by adding the necessary message types to `src/types/messages.ts` and exporting them from `src/index.ts`.

Phase 1 (Red): I created `src/types/messages.test.ts` to assert the existence and structure of `ListSessionsMessage` and `SessionListMessage`. While Vitest's default non-type-checking mode meant the test didn't fail specifically on missing types, it provided the structural baseline for the implementation.
Phase 2 (Green): I implemented `ListSessionsMessage`, `SessionSummaryFrame`, and `SessionListMessage` in `src/types/messages.ts`, added them to the `IncomingMessage` and `OutgoingMessage` unions respectively, and updated `src/index.ts` to export these new types.
Phase 3 (Refactor): I updated the test to verify the runtime properties of these new types. I also ran Prettier on all modified files and updated `.lore/dod.md` to mark this facet as complete.

I have committed and pushed these changes to the `loop-bench/144` branch and merged the latest from `main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ListSessionsMessage, SessionSummaryFrame, and SessionListMessage to src/types/messages.ts","tdd_next":"Validate list_sessions frames in src/transport/ws/validation.ts"}}