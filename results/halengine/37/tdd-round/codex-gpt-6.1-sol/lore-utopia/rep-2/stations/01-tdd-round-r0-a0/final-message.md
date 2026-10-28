Committed and pushed `f0e952c`: static schemas now compile at registration and invalid schemas fail with the tool name.

One new test failed as expected, then passed after implementation and refactor. Regressions observed: 0; acceptance tests left to CI. Branch is current with main and fully pushed.

Next: validator reuse and dynamic schema caching. Unrelated smells: none identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static schemas at registration and reject invalid schemas naming the tool","tdd_next":"Reuse static validators and cache dynamic schemas by object reference"}}