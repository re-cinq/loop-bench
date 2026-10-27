Replaced the acceptance test’s `new Date()` with a fixed timestamp. Prettier left the file unchanged. I committed and pushed `8128118`; `origin/main` was already merged, and the branch is synced with its upstream.

I did not rerun lint locally. CI’s reported lint finding is addressed; the next CI run will judge the fix.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Replaced the nondeterministic new Date() in the acceptance test with a fixed timestamp."}}