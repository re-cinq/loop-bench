Replaced the runtime timestamp in the acceptance test with a fixed ISO timestamp to address the lint finding. Prettier left the file unchanged. I did not rerun lint in this pod.

Committed and pushed `8031608`; `origin/main` was already merged, and the branch is up to date with its upstream.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"Fixed the nondeterministic timestamp and pushed it, but the new CI build has not yet reported green."}}