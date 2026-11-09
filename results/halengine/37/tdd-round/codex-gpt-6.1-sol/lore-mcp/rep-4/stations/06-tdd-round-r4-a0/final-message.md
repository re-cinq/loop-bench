Committed and pushed `5d2576c`. Malformed input now returns a schema rejection before execution without exposing values.

One new test went red, then green; 0 regressions observed. Acceptance tests remain for CI. Main is merged; the branch is clean and fully pushed. Next: validator caching.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject schema-invalid tool input before execution and repair the Ajv constructor type","tdd_next":"Cache static and dynamic schema validators"}}