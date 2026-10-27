Completed and pushed commit `ce12deb`.

- Added and validated `list_conversations` protocol types/cursor.
- Fixed all CI-reported eslint issues.
- Ran only `src/transport/ws/validation.test.ts`: 7 passed.
- Merged `origin/main`; branch is synchronized.
- Red tests: 1 authored, 0 regressions.
- Next facet: dispatch/configure `list_conversations`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add additive list_conversations and conversation_list protocol types and validate the request cursor.","tdd_next":"Dispatch list_conversations through the history opt-in and return conversation_list summaries."}}