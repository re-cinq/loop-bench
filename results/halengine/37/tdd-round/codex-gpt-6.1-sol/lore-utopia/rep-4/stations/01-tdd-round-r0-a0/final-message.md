Pushed `02b8080`: invalid static schemas now fail registration with the tool name.

One new test failed as expected, then passed after implementation and formatting. No regressions reported; acceptance tests were not run. Branch is clean and synchronized with upstream.

Next: retain validators and implement schema caching. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid static schemas at registration naming the tool","tdd_next":"Retain static validators and cache dynamic validators by schema object reference"}}