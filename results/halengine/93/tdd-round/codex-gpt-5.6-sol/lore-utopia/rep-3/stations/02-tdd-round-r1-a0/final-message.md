Committed and pushed `0339997` (`docs: trace aggregate usage behavior`).

- Closed the missing-usage aggregation facet.
- Fixed both CI traceability findings and added spec anchors.
- Added the required consumer-facing changelog entry.
- Formatted all changed files and confirmed the branch matches its upstream.
- No tests run locally: this round repaired CI metadata/docs and acceptance tests are prohibited here.
- Red tests: 0 introduced, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do.","tdd_next":"Preserve the unchanged no-tool regression guard."}}