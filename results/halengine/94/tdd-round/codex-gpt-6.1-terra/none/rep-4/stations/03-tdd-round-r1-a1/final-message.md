Committed and pushed the CI repairs in `9e5eb60`. The spec now describes the failure guarantee, and the changelog explains the change for consumers. The branch is up to date with `origin/main` and its upstream.

No tests were run locally: this round repaired existing test files and did not write a new test. The prior CI verdict reported no red tests or regressions; it reported typecheck, lint and changelog failures. CI must verify the repairs. No unrelated smells were addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI findings and document the beforeSession failure guarantee","tdd_next":"acceptance green"}}