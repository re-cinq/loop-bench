Added one `direct` acceptance test and updated the spec and DoD. The test was run alone and failed for the reported behavior: **“Expected [onError, afterSession]; Received []”**. It also confirmed the caller still receives the original rejection.

Committed and pushed as `40f1c55`. The branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}