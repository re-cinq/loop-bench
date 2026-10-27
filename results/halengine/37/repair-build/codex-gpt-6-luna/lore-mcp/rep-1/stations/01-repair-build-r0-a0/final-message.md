Fixed the Ajv import, retained the schema compilation error’s cause, and addressed both lint findings in the acceptance test. Tool input is validated before execution, with sanitized rejection details.

`npm run test:coverage` passed: 33 suites and 393 tests. I did not run typecheck or lint, as instructed. The commit is pushed, and the branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Ajv import broke test loading and typecheck; schema validation and CI lint errors are fixed"}}