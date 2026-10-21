Replaced the runtime timestamp in the acceptance test with a fixed value. Prettier reported the file was unchanged. The fix is committed and pushed; `main` was already up to date, and the branch is synced with its upstream.

I didn’t run ESLint locally, as instructed. CI needs to judge the pushed fix.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"made the acceptance test timestamp deterministic to resolve the ESLint finding"}}