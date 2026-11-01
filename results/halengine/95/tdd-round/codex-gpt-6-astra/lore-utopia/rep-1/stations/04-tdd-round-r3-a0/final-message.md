Committed and pushed `e95661c`, repairing the reported catch lint finding with a conversion probe.

One new test went red, then green after implementation and refactoring. CI reported zero test regressions. Acceptance checks remain CI-owned. Branch is current with main and fully pushed. No unrelated smells addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair rejection conversion catch with a status-returning probe","tdd_next":"Pin original causes for ordinary plain-object and undefined rejections"}}