Blocked on the CI failures: the brief names two existing WebSocket tests failing with HTTP 501 and a coverage shortfall, but truncates the log. Lore returns “branch not found” for both branch names checked.

The transport/store code is unchanged from main; I cannot establish a corrective change from this evidence. Red tests: 0 mine, 2 existing failures; causation remains unverified. No files changed, tests run, or commits pushed.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"CI reports HTTP 501 failures and a coverage shortfall, but the log is truncated and Lore cannot retrieve either branch's CI details to establish a corrective change."}}