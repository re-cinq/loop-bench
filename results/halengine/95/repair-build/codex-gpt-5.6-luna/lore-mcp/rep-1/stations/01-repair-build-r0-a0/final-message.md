Fixed the CI failure by replacing `new Date()` with a deterministic timestamp in the acceptance test.

- Formatted with Prettier
- Committed and pushed: `92912ae`
- Merged `origin/main` (already up to date)
- Branch is synchronized with upstream
- Linter not run per instructions

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Replaced nondeterministic new Date() in the acceptance test with a stable fixture timestamp"}}