Committed and pushed `fa8eb04`: invalid static schemas now fail registration with the tool’s name.

One new test failed, then passed after implementation and refactor. No regressions observed; acceptance tests were not run. Base is current; working tree is clean and nothing is unpushed.

Next: validator reuse and dynamic schema caching. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid static schemas at registration naming the tool","tdd_next":"Retain static validators and cache dynamic schemas by object reference"}}