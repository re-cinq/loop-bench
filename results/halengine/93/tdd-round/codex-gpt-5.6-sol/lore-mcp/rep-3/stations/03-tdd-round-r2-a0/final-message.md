Repaired and pushed commit `2723f50`.

- Moved the contract test to the composition-root layer.
- Test now exercises the real public orchestrator API.
- Updated the spec traceability link.
- Focused test passed: 1/1.
- Prior red findings: 1 own test, 0 regressions.
- Branch is merged with `main`, pushed, and synchronized.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair the aggregate-usage public contract test so it exercises production code within layer boundaries","tdd_next":"Preserve the unchanged no-tool regression guard, `receives collected response text and usage`, in `src/orchestration/chatOrchestrator.test.ts`"}}