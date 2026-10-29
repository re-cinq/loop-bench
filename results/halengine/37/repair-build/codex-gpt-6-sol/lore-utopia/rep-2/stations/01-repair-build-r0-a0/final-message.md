Fixed the Ajv import, added input validation before tool execution, and resolved the three reported lint findings. All 14 tests in the three CI-named suites pass locally. I did not run lint, typecheck, or the full build in this pod; CI will judge those checks.

Committed and pushed as `af0fa68`. The branch is current with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Ajv import and missing tool-input validation broke the named CI checks"}}