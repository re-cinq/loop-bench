Closed the `list_sessions` validation facet: the validator accepts a bare frame, validates limits and cursors, and strips unknown fields. Added the required message type, a spec citation, and a DOD checkbox update.

The test I wrote failed first, then passed after implementation and refactoring. It passed again after formatting. **Red tests: 1 was mine; 0 regressions were reported.** I did not run acceptance tests. Lore returned 404 for the CI record, so this round has no CI verdict.

Committed and pushed as `63afbb8`. The branch is up to date with its upstream and `origin/main`. The test descriptor script does not emit a `spec` field; I added a spec anchor comment and citation, but could not verify automatic descriptor linking.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"validate list_sessions frames","tdd_next":"add the remaining public message types and exports"}}