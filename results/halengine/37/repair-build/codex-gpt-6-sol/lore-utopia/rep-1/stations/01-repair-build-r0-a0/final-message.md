I fixed the Ajv import, added input validation before tool execution, and addressed all three reported lint findings. The repair is committed and pushed as `0b7abe5`; the branch is up to date with `main` and its upstream.

Prettier and `git diff --check` passed. I did not run tests locally because this checkout lacks Ajv; CI has not yet judged the push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed the Ajv import, schema validation, and reported lint errors; CI recheck pending"}}