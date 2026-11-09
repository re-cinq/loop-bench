Committed and pushed `84bf1a4`. Missing required input now returns a rejection before execution. Repaired the reported CI import and lint findings.

One new test went red, then green; zero identified regressions. Acceptance tests were not run. Branch is current with main and upstream.

Next: validator caching. No unrelated smells addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject missing required input before executor invocation","tdd_next":"Retain static validators and cache dynamic schemas by object reference"}}