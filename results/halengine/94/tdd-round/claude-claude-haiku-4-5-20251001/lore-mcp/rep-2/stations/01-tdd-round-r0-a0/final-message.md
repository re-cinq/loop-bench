Perfect! I've completed the first TDD round. Here's a summary of what was done:

**Red:** I wrote a unit test in `chatOrchestrator.test.ts` that validates `beforeSession` throwing behavior—specifically that `onError` and `afterSession` should both be called, and the error should still propagate.

**Green:** I moved the `beforeSession` call inside the `try` block in `chatOrchestrator.ts` (line 92). This ensures that when `beforeSession` throws, the `catch` block (which calls `onError`) and the `finally` block (which calls `afterSession`) both execute—fixing the core issue in ticket #94.

**Refactor:** All 24 existing tests pass, code is properly formatted with Prettier, and the test validates the expected behavior.

The first facet is complete. Two facets remain:
- Update `specs/hal-engine-config-hooks/spec.md` with the new guarantee
- Document in the CHANGELOG what changes

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside try block","tdd_next":"Update specs/hal-engine-config-hooks/spec.md"}}