Committed and pushed `55d8b4c`; the branch is up to date with its upstream, and `origin/main` merged cleanly.

The registry test passed: 1 suite, 6 tests. I consolidated its compilation-count assertions to address the reported lint failure. Ajv was already in `dependencies`; I bumped the package to `0.5.0` and checked off that facet.

The previous CI report also lists a failed test step, but its details were truncated and the branch-specific CI lookup was unavailable. I can’t determine from the available report whether those red tests were ours or regressions. No unrelated issues were changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ajv to dependencies and bump package version MINOR","tdd_next":"Compile static ToolDefinition.inputSchema at register time and cache dynamic validators by schema reference"}}