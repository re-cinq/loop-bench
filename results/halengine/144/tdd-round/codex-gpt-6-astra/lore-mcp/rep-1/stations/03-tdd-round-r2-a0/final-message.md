Committed and pushed `767e9eb`; branch is current with main and upstream.

Completed cursor validation and addressed three CI lint findings. One new test went red → green and passed after refactoring. No regressions identified in the supplied CI verdict. Acceptance tests remain CI’s responsibility.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions before cursors and strip unknown fields","tdd_next":"Thread sessionStore into createMessageHandler and createServer"}}