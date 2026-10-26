Pushed and up to date. The DoD facets are all already ticked; this round fixed all 9 ESLint errors that CI reported:

- **Duplicate code** (conversationList ↔ sessionResume): extracted `terminateAll()` to `wsTestSupport.ts`; both files now call it
- **Boolean flag `history`** in `startEngine`: split into `startEngine` (history off) and `startEngineWithHistory` (history on)
- **Nested if** in `askAfterConnect`: flattened with guard clauses
- **Boolean literal args** at call sites: removed by renaming to `startEngineWithHistory`
- **`Array(11).fill(false)`** in `validation.test.ts`: changed to `Array.from({length: 11}, () => false)`

0 regressions — `sessionResume.test.ts` (25 tests) and `validation.test.ts` (4 tests) both pass green after the changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix all 9 eslint errors reported by CI","tdd_next":"acceptance green"}}