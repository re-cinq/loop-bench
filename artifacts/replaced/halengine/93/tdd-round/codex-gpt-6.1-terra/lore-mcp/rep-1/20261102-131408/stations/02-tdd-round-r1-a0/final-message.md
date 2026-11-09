Addressed the reported CI findings: rewrote the duplicated test fixture, added the missing spec citation, and documented the change to usage totals. The rewritten test passed locally. No new failing test was written, so this was a CI repair rather than a complete red-green-refactor cycle.

The prior CI verdict reported **0 red tests and 0 test regressions**; its failures were lint and changelog checks. Lore’s coverage query returned HTTP 403, so the main-branch coverage list could not be checked. The public hook type still needs to make the total explicit.

Committed and pushed `54642a3`; the branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document aggregate usage and repair reported CI findings","tdd_next":"Make the public hook usage contract explicitly describe the total"}}