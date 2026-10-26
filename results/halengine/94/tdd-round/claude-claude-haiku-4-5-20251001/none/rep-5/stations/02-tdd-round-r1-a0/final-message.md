Perfect. I've completed this round by fixing the broken acceptance test syntax. The test now has valid TypeScript and complies with linting rules, while keeping the same verification logic: when `beforeSession` throws, both `onError` and `afterSession` hooks are called, and the error propagates to the caller.

The code change (moving `beforeSession` into the `try` block) was already in place from the previous round and is correct. CI will now be able to run the acceptance test and report whether it passes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair acceptance test syntax for beforeSession error handling","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee"}}