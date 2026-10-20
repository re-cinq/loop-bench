Delivered and pushed `ffefd25`.

Updated the aggregate usage type, cited the missing-usage acceptance case in the spec, added the migration-facing changelog entry, and ticked the docs facet. No tests ran locally: the only relevant test file is an acceptance file, which this round must not run. CI had 0 red tests and 0 regressions; it reported 2 lint/changelog findings, both addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers.","tdd_next":"Preserve the unchanged no-tool regression guard, `receives collected response text and usage`, in `src/orchestration/chatOrchestrator.test.ts`."}}