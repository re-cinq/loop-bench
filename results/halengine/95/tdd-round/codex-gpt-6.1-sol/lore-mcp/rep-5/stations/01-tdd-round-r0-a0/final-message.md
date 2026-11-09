Committed and pushed one round. Non-Error rejections now reach `onError` with their original cause; caller rejections remain unchanged.

The new test passes after formatting. Initial red: one new test file; no regressions observed. Acceptance and existing tests await CI. Branch is synchronized with upstream and main.

Next facet: handle objects whose string conversion throws. No unrelated smells changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Normalize non-Error rejections for onError while preserving cause and Error identity","tdd_next":"Handle rejection values whose string conversion throws"}}