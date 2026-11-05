Committed and pushed `efb131c`: static tool registration now rejects invalid schemas and names the tool.

One test went red, then green; no regressions observed. Acceptance tests remain CI’s responsibility. Main is merged; the working tree is clean and fully pushed.

Next: retain validators and validate execution input. No unrelated smells addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid static schemas at registration with a tool-named error","tdd_next":"Retain compiled validators and validate input before execution"}}