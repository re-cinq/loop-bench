Fixed and pushed as `48fe869`. Ajv’s import prevented module loading; the repair uses its default export, validates inputs before execution, and reports safe field paths. I also fixed the reported lint findings.

`npm run test:coverage` passes: 33 suites, 393 tests. The branch is up to date with its upstream, and `origin/main` merged cleanly. CI has not yet judged this new commit.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Ajv’s ESM import prevented tests from loading; input validation and safe rejection paths now pass locally"}}