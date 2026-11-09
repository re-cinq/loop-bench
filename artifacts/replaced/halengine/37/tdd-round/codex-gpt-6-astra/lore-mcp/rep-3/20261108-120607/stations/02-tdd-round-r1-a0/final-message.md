Committed and pushed `5182460`; branch is current with main and upstream.

One new test went red → green and passed after refactoring. No regressions identified. Fixed the reported import and lint findings. Acceptance tests remain CI’s responsibility.

Next: validator caching. No unrelated changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject missing required input before executing the tool; repair reported import and lint findings","tdd_next":"Retain static validators and cache dynamic validators by schema object"}}