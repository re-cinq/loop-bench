Changed the registry to import Ajv through its public package entry and pushed commit `68d6449`. The focused runtime test failed against the previous loader and passed with the change. CI will verify the reported module-resolution and typecheck failures.

The previous CI verdict named test-suite loading failures but was truncated, so the number of red tests and regressions cannot be determined from it. No unrelated issues were changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Resolve Ajv through its public package entry","tdd_next":"Remaining unit tests, spec links, and documentation"}}