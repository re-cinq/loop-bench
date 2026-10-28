Committed and pushed `9ff5bbf`: static schema compilation now rejects invalid schemas at registration, naming the tool.

One new test went red, then green after implementation and final review. No regressions observed; acceptance tests were not run. Branch is current with main and fully pushed.

Next: retain validators and add dynamic-schema caching. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid static input schemas at registration","tdd_next":"Retain static validators and cache dynamic schemas by object reference"}}