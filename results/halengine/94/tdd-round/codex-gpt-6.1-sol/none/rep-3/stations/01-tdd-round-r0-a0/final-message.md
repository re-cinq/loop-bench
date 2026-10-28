Committed and pushed `5aa71bb`. One red-green-refactor round completed: startup failures now reach error handling and cleanup. Updated the spec, changelog, and facet checklist.

New test: failed as expected, then passed after the fix and final review. Reds: 1 mine; no regressions observed. Acceptance tests remain for CI. Main is merged; working tree is clean and fully pushed.

Unchanged concerns: non-Error rejection handling and usage accounting.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle beforeSession failures through existing error and cleanup paths","tdd_next":"acceptance green"}}