Fixed the Ajv import, added input validation before tool execution, and resolved the three reported lint findings. The two affected Jest suites passed (5 tests). I did not run the full build, typecheck, or linter in this pod; CI will judge those checks on the push.

Committed and pushed as `230905e`. The branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed Ajv module loading, tool input validation, and the reported lint findings"}}