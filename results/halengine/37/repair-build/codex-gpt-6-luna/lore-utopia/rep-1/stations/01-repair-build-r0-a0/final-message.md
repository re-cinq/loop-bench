Fixed and pushed **`d8bce24`**. Ajv now uses its default import; `execute` validates inputs and returns safe rejection details, with static validators compiled once and dynamic schemas cached by object. I also fixed the reported lint issues and added registry tests with spec links.

`npm run test:coverage` passes: 33 suites, 397 tests. The branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed Ajv imports, wired schema validation into tool execution, and resolved the reported lint issues"}}