Added a focused test for an `undefined` provider rejection. It failed before the change and passed after the orchestrator wrapped non-`Error` values with a readable message and preserved the original as `cause`; the caller still receives the original rejection. Updated the spec citation and checked the completed facet in `.lore/dod.md`.

The round’s test passed. CI failures could not be retrieved because Lore returned “branch not found.” No regressions were reported here; the existing Error-instance tests were not run. The repo’s anchor script skipped this spec because its anchor set differs from `origin/main`; I verified and corrected the affected links manually.

Committed and pushed as `511db7d`. Merging `origin/main` was already up to date, and the branch has no unpushed commits. The remaining facets are to confirm the existing Error-instance tests and add the changelog entry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Coerce undefined and other non-Error rejections for onError while preserving the caller rejection","tdd_next":"Confirm existing Error-instance tests remain green without modification"}}