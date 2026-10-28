Committed and pushed `5fb0949`; merged base is current and the working tree is clean.

Required-input rejection now passes. The unit-test file passes both tests after formatting. Red phase: 1 new failing test, 0 observed regressions. Reported CI findings were repaired; acceptance tests were left to CI.

Next: validator caching. No unrelated smells addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject missing required input and repair reported CI findings","tdd_next":"Retain static validators and cache dynamic schemas by object reference"}}