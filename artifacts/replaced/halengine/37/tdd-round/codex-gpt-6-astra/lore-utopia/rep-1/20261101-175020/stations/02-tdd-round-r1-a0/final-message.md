Committed and pushed `83fd8df`; branch is clean and current with main.

One new test went red → green. Repaired CI’s import issue and two fixture lint findings without changing acceptance assertions. Previous CI showed two ticket-owned suites failing and two regression suites failing to load; CI must confirm the repairs.

Next: retain and cache compiled validators.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject missing required input before execution and repair reported CI findings","tdd_next":"Retain static compiled validators and cache dynamic schemas by object reference"}}