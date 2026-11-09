Committed and pushed `f9ec850`. Dynamic validators now cache by schema reference; restored the Ajv import path.

One new test failed, then passed after implementation and refactoring. No confirmed regression tests were named in CI’s truncated report. Branch matches upstream; main is current. No unrelated changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Cache dynamic schema validators by object reference","tdd_next":"Complete input validation coverage and documentation"}}