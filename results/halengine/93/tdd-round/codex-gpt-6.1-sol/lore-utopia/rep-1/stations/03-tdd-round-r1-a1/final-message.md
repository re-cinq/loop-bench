Committed and pushed `1397e9d`. Provider rounds now accumulate usage. Repaired both reported lint findings.

One new test went red, then green; it passed after formatting. No regressions identified in the supplied CI verdict. Acceptance tests remain CI’s responsibility.

Next: make the public hook type explicitly describe total usage. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wire sumTurnUsage into the provider-round loop","tdd_next":"Expose an explicit total-usage public hook contract"}}