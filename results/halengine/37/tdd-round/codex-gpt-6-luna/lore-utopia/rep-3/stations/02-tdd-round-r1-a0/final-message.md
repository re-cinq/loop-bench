Completed and pushed one red-green round: wrong-typed input now returns the field path and expected type without leaking its value to the result or logs. The focused test passed; the earlier run of that same test failed as expected. **Red tests written: 1; regressions: 0.**

The round also fixes the reported registry type errors and adds a changelog entry. The previous CI report includes lint findings in `registry.acceptance.test.ts`; I left that acceptance file unchanged as required. CI will need to judge the push. The branch is up to date with its upstream.

Commit: `7d2c94d` — `Reject wrong-typed tool input safely`

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"wrong-typed input rejection with field path and expected type, without leaking values","tdd_next":"static schema compilation and function-valued schema caching"}}