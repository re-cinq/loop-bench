Committed and pushed `2ab51fb`; branch is current with main and upstream.

One new behavioral test went red → green. Addressed CI’s import failure and two lint findings. Prior CI named two ticket-owned failing suites and two regression suites; CI will verify repairs.

Next: validator caching. No unrelated smells changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject missing required input before executor invocation","tdd_next":"Reuse static validators and cache dynamic schemas by object reference"}}