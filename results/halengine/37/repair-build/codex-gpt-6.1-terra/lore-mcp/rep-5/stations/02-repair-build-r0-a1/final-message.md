Fixed and pushed the reported Ajv import and lint errors in commit `a774749`. The branch is up to date with `origin/main` and its upstream.

Prettier and `git diff --check` passed. I did not run the test suite: the installed Ajv is version 6, while the branch declares version 8. CI needs to verify the push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed the Ajv module import and three reported lint findings; CI verification pending"}}