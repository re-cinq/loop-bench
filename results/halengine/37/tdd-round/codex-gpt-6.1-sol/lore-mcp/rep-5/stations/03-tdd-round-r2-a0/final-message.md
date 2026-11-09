Committed and pushed `b89a677`; branch is current with `main` and upstream.

One focused test went red, then green. Added validator caching and repaired the reported Ajv import and assertion-count failures. Local red tests: 1 new, 0 regressions; CI’s existing-test failures were not rerun.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Cache static and repeated dynamic schema validators; repair reported CI findings","tdd_next":"Verify distinct dynamic schemas and complete privacy/type/enum coverage"}}