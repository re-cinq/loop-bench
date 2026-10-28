Committed and pushed the round. The new test pins object and `undefined` rejection values as `Error.cause` while checking that callers receive the original values. It failed when `cause` was temporarily removed and passed after restoration. I also fixed the three lint findings and two stale spec links reported by CI.

Red tests: 1 mine, 0 regressions. The remaining facet is CI confirmation that the existing `Error` instance tests stay green. The branch is synchronized with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Pin object and undefined rejection values as Error.cause while preserving caller values","tdd_next":"Confirm existing Error-instance tests remain green"}}