Committed and pushed one round (`e28d47a`). The new direct-answer usage test failed, then passed after the fix. I also added the missing spec link and a retry for the Mongo cache-lock error reported by CI. The branch is even with its upstream.

Red tests: 1 written this round; 1 existing Mongo test reported by prior CI. The next CI run will judge the Mongo fix. No unrelated smells were changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Preserve the unchanged no-tool regression guard","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}