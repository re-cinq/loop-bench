Branch is up to date with origin. 

**Round summary:**
- **Facet closed:** Move `beforeSession` inside the `try` block in `chatOrchestrator.ts` — `onError` and `afterSession` now fire when `beforeSession` throws.
- **Test written:** `src/orchestration/chatOrchestrator.beforeSession.test.ts` — "calls onError with the thrown error when beforeSession throws" — confirmed red before fix, green after.
- **Red tests:** 0 regressions, 0 unowned failures.
- **Future improvements noted (out of scope):** The `instanceof Error` gate on `onError` at line 150 silently swallows non-Error throws — but that's explicitly out of scope per the ticket.
- **Next facet:** Update `specs/hal-engine-config-hooks/spec.md` with the new guarantee and document in CHANGELOG.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside try block so onError and afterSession fire on beforeSession throw","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with new guarantee and add CHANGELOG entry for existing consumers"}}