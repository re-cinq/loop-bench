Fixed the reported Ajv import and lint findings, formatted the changed files, and pushed commit `0c2fde4`. The branch is up to date with `origin/main` and its upstream.

`npm run test:coverage` got past the import error but still failed acceptance tests: malformed input reaches the executor instead of being rejected. The local checkout has Ajv 6 installed, while the branch declares Ajv 8; CI will judge the pushed changes with its dependency install.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"npm run test:coverage still fails acceptance tests because tool input validation is not implemented"}}
