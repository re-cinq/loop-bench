Committed and pushed `010d808`; branch is clean and current with main.

One new test went red → green. Prior CI reported two ticket suites and one regression suite (`config.test.ts`) failing to load; import and lint fixes await CI verification. No unrelated changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject missing required input before invoking the executor; repair reported CI findings","tdd_next":"Reuse static validators and cache dynamic schemas by object reference"}}