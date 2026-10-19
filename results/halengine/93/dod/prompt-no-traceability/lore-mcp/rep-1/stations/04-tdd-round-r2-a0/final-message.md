Branch is current. Pushed 1 commit fixing all 8 stale spec anchors (chatOrchestrator.test.ts tool loop tests shifted 27 lines earlier when usage-accumulation tests were inserted). This resolves both the `eslint` failures (require-spec-link now finds links at the actual line numbers L401 and L413) and all 8 `spec-names` failures.

No regressions were introduced — no tests written, no source code changed, only spec link reanchoring.

**Current Loot Inventory:** Your spec anchor map, 15% of your CI compute budget, your false confidence that line numbers stay stable after insertions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix all CI failures (eslint require-spec-link + spec-names stale anchors)","tdd_next":"acceptance green"}}