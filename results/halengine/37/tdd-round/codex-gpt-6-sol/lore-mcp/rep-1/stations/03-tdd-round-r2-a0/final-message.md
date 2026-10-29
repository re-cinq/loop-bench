Committed and pushed the validation facet. The new test failed on the missing field path, then passed after the fix and refactor. I also repaired the Ajv import, test type error, and lint finding reported by CI. The branch is up to date with `origin/main` and its upstream.

Red tests: 1 written this round; 2 existing non-acceptance suites failed in the previous CI run. CI has not yet judged this push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate tool input and report failing property paths without values","tdd_next":"Add remaining unit tests, spec links, and documentation updates"}}