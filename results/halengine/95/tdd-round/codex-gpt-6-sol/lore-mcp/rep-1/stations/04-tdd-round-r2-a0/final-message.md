Committed and pushed the round as `3e93476`; the branch is up to date with `origin/main` and its upstream. The new revoked-proxy test went red, then green. I also repaired all four lint findings reported by the previous CI run. Acceptance tests and lint remain for CI to judge.

Red tests: 1 mine, 0 regressions. No unrelated smells noted.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Preserve revoked proxy rejections while calling onError and repair the four CI lint findings","tdd_next":"acceptance green"}}