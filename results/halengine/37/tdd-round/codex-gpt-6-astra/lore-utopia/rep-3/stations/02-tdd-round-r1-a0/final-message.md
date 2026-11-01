Committed and pushed `f763978`. Static tool input now validates before execution; CI import and lint findings were repaired.

One new test went red, then green after refactoring. Prior CI reported two ticket test suites failing to load and one regression (`config.test.ts`). Acceptance tests remain CI’s responsibility.

Branch is current with main and fully pushed. Next: dynamic-schema validation and caching.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid static tool input before execution and repair reported CI findings","tdd_next":"Validate function-valued definitions and cache validators by schema reference"}}