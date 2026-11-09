Committed and pushed `7198558`, addressing the reported Ajv type-resolution and validation-test lint errors. The branch is up to date with `origin/main` and its upstream.

No tests ran locally: this visit repaired CI findings and added no test. CI reported a Vertex provider test failure, but its error was truncated and the CI detail service could not retrieve it. The number of red tests and regressions therefore remains unknown. The remaining unit tests and documentation are still open.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair reported Ajv type resolution and validation-test lint errors","tdd_next":"investigate the Vertex test failure and complete remaining tests and documentation"}}