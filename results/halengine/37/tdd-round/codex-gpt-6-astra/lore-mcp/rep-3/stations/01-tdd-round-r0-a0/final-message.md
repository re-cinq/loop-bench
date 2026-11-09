Committed and pushed `43233f2`: static schemas now compile at registration and invalid schemas produce an error naming the tool.

One new test went red → green; no regressions observed. Acceptance tests remain for CI. Branch is current with main and fully pushed. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid static schemas at registration, naming the tool","tdd_next":"Retain compiled validators and reject invalid input during execute"}}