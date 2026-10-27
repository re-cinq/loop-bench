Repaired the CI findings in commit `d41a223` and pushed it. The repeated usage-hook setup now uses a shared helper, and the affected spec links are reanchored. `origin/main` was already merged; the branch is even with its upstream.

No tests were written or run this round. The previous CI verdict named zero red tests and zero regressions; it reported two ESLint findings and one stale spec anchor.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair the reported ESLint duplication and spec-link failures","tdd_next":"acceptance green"}}