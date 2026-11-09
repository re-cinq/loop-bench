Committed and pushed `14cbe29`. Invalid tool input now returns a rejection before execution; repaired the Ajv constructor type.

One new test went red → green and passed after refactoring. CI listed two acceptance failures, no regression-test failures, and one typecheck regression addressed here. Acceptance and typechecking remain CI’s responsibility.

Branch is current with main and fully pushed. No unrelated smells addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject schema-invalid tool input before execution and repair Ajv constructor typing","tdd_next":"Reuse static validators and cache dynamic schemas"}}