Committed and pushed `1f42294`: invalid static schemas now fail registration with the tool’s name.

One new test went red, then green after implementation and refactor. No regressions observed; CI history was unavailable. Acceptance tests were not run. Branch is synchronized with origin and main.

Next: retain compiled validators and add dynamic-schema caching. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid static schemas at registration with an error naming the tool","tdd_next":"Retain static validators and cache dynamic schemas by object reference"}}