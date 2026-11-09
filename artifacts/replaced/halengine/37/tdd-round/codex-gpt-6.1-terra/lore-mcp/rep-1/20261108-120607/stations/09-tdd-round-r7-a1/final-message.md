The round is blocked: after a clean `npm ci --ignore-scripts`, the reported Ajv entry point resolves locally, so I cannot identify a code change that fixes CI’s module-resolution failure. The CI test output is truncated before the failing test names, and Lore could not retrieve the branch verdict. CI also reported duplicated code in two test files and a formatter timeout.

I made no changes or commit and ran no tests. The number of red tests written on this branch versus regressions cannot be determined from the available verdict.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"CI cannot resolve Ajv despite a successful clean local install, and the failing test names are truncated"}}
