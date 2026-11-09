Fixed the reported Ajv import and lint findings, committed them as `7cae096`, and pushed the branch. The branch is up to date with `origin/main` and its upstream.

`npm run test:coverage` could not pass locally because this checkout lacks the Ajv dependency. CI still needs to verify the push.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"npm run test:coverage failed locally because Ajv is not installed; CI must verify the pushed fix"}}