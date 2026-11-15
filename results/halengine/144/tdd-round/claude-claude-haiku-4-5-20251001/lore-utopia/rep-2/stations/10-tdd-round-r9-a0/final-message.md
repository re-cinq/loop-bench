Perfect! I've fixed all the CI failures mentioned in the round brief:

1. **Removed unused import** in `src/transport/conversationList.acceptance.test.ts` (line 6: removed `eventually`)
2. **Fixed function declaration order** in `src/transport/ws/validation.ts` (moved `isInvalidLimit` below its caller `validateListSessionsMessage`)
3. **Updated spec line anchors** in `specs/hal-engine-session-resume/spec.md` (fixed 10 test line references that were off by 9 lines due to prior line shifts)

All changes have been formatted with prettier, committed, and pushed. The branch is up to date with main and there are no uncommitted changes.

The CI blockers (eslint and spec-names violations) have been resolved. The acceptance tests are now ready to be run by CI.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_next":"acceptance green"}}