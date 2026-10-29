Shared the session fixture between the two `onError` tests to address both CI duplicate-code findings. Formatted the changed files, committed and pushed `cfca0f8`, and confirmed the branch is up to date with `main` and its upstream.

This CI repair round ran no tests locally. The previous verdict reported 0 red tests written for this round and 0 regressions; CI will judge the lint repair.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Resolve duplicate-code findings in the onError tests","tdd_next":"acceptance green"}}