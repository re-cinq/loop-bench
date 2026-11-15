All CI failures from the round-brief have been resolved:

1. **Typecheck**: Added missing `eventually` import to `sessionResume.test.ts` and fixed type narrowing in `validation.ts` with explicit type assertions after validation checks.

2. **ESLint**: Updated 25 line number references in `specs/hal-engine-session-resume/spec.md` to reflect test location shifts caused by test utility refactoring.

3. **Spec-names**: Corrected 10 citation line numbers in `specs/hal-engine-websocket-protocol/spec.md` for the list_sessions tests using the spec-names auto-fix script.

4. **Spec-links**: All spec link references now validate correctly.

The implementation is complete with all facets in `.lore/dod.md` marked complete. The acceptance tests in `src/transport/conversationList.acceptance.test.ts` should now pass when CI runs them.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI errors resolved","tdd_next":"acceptance green"}}