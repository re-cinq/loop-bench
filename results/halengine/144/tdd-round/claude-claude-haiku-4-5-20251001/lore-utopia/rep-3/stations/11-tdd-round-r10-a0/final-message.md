Perfect! I've successfully fixed all the CI failures from the previous round:

1. **Removed unused import** — `SessionSummary` was imported but never used in `listSessions.test.ts`
2. **Fixed type error** — The test mock had an invalid `load` property that doesn't exist in `SessionStore`. Updated it to implement the correct interface methods (`create`, `get`, `delete`, `count`, `clear`, `listFor`).
3. **Added spec links** — Added spec statement for `StoreCannotList` behavior and annotation to websocketCleanup test
4. **Fixed spec anchor** — Updated the spec to point to the correct test line (#L40 instead of #L38)

All the facets in `.lore/dod.md` are already checked off from the previous round. These fixes clear the way for the acceptance tests to run without type/lint blocking errors.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI failures resolved","tdd_next":"acceptance green"}}