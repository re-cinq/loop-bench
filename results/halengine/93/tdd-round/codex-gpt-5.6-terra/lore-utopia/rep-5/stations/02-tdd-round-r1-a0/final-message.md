Committed and pushed `8e56003`.

- Fixed all 5 reported CI findings: traceability anchors, duplicate test setup, changelog entry.
- Exported `TotalUsageMetadata` publicly.
- Focused regression test passed; acceptance tests were not run.
- Red tests: 0 mine, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do.","tdd_next":"Preserve the unchanged no-tool regression guard, receives collected response text and usage."}}