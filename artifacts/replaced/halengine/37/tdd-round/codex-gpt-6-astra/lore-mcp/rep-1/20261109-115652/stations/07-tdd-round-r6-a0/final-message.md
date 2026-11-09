Committed and pushed `26abb0f`; branch is current with main and upstream.

One red-green-refactor round completed. The new test reproduced the constructor failure, then passed with Ajv 6 and 8. Local red tests: 1 new, 0 observed regressions. Acceptance and build checks remain CI’s responsibility.

Next: remaining contract tests and documentation. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix Ajv constructor interoperability and pin static schema reuse","tdd_next":"Remaining contract tests and documentation"}}