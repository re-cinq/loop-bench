Extracted shared setup from the two onError tests to address the previous CI duplication findings. Prettier and `git diff --check` passed; no tests were run. Committed and pushed as `a552540`; the branch is up to date with its upstream and `origin/main`.

This round had 0 tests of mine and 0 regressions. No unrelated smells were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Shared onError test setup to clear CI duplicate-code findings","tdd_next":"acceptance green"}}