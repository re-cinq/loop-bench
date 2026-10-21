Fixed the three CI traceability findings by attaching each `onError` test link to its matching guarantee in the spec. Committed and pushed as `523aa21`; `origin/main` was already up to date, and the branch is not ahead of its upstream.

No tests were written or run this round; the required work was repairing the previous CI findings. Red tests this round: 0 ours, 0 regressions. The `lore-query-trace` command was unavailable, and no source symbols were changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair onError spec test link placement","tdd_next":"acceptance green"}}