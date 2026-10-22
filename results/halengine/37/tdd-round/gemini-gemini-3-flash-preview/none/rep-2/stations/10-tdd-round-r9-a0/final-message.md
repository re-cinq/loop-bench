I have completed the red-green-refactor round for ticket #37.

### Accomplishments

- **Fixed ESLint failures:** Removed all `any` casts from `src/orchestration/tools/registry.ts`, specifically addressing the `new (Ajv as any)` instantiation and the `ErrorObject` property access reported by CI.
- **Improved validation error formatting:** Fixed a bug in `formatAjvError` where missing required properties in nested objects only reported the leaf property name. It now correctly reports the full path (e.g., `user.address.city is required`).
- **Added unit verification:** Added a new test case to `src/orchestration/tools/registry.test.ts` that specifically exercises nested property validation for both missing required fields and type mismatches.
- **Verified technical integrity:** Ensured all unit tests pass, formatted the modified files with Prettier, and confirmed that spec anchors remain valid.

### Next Steps

The behavioral implementation and the reported lint failures are now resolved. The next round should verify that the acceptance tests are green on CI.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix ESLint errors and improve validation error formatting for nested properties","tdd_next":"acceptance green"}}