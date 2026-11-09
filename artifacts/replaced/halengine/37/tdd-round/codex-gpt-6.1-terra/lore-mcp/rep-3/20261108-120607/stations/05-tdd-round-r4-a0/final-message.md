Committed and pushed `797a0a9`. Rejections for explicitly disallowed extra properties now name the escaped property path. The new test failed before the change and passed afterward. I also addressed CI’s reported Ajv import and test lint findings.

The previous CI excerpt is truncated, so the provider-factory test failure’s cause remains unverified. This round had **one red test of mine**; the number of regression tests in the previous CI run cannot be determined from the excerpt. The branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Identify explicitly disallowed extra properties by escaped path","tdd_next":"Investigate the truncated provider-factory CI test failure and complete remaining unit tests and documentation"}}