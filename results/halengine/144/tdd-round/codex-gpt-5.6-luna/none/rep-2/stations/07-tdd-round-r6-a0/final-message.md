Implemented and pushed commit `fa97c8a`.

- Added enabled `list_conversations` handling with authenticated-user authorization and ISO serialization.
- Threaded `transport.history` configuration.
- Fixed CI-reported validator and lint issues.
- Focused test passed: 58 tests.
- No regressions identified; acceptance suite/typecheck/lint were not run locally per instructions.
- Next facet: unsupported and store-error behavior.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"enabled conversation-list handler dispatch","tdd_next":"unsupported and store-error behavior"}}