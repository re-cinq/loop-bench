Committed and pushed `95769cc`. Static tools now reject missing required input before execution.

One new test went red → green and passed after refactoring. CI’s truncated report named two existing-suite regressions and two ticket-suite failures; their import cause was addressed. CI checks remain pending.

Branch is current with `main`, with no unpushed commits. Next: dynamic-schema caching. No unrelated changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Retain static validators and reject missing required input before execution; repair reported CI findings","tdd_next":"Cache and validate function-valued schemas by object reference"}}