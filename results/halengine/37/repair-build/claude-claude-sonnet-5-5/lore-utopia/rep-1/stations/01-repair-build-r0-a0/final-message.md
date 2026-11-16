I fixed all three red checks and pushed the branch. I haven't run the tests, typecheck or lint, as instructed, so CI has to confirm the fix. The branch is level with its upstream and already contains `origin/main`.

- **typecheck and test:** `import {Ajv} from 'ajv'` failed both as a type and at runtime. I now import the module as a default and take the constructor from its `.default`, with a comment in `src/orchestration/tools/registry.ts` saying why. This one change should clear the typecheck error and the "does not provide an export named 'Ajv'" failures in the test suites.
- **`preserve-caught-error`:** the schema-compile error in `registry.ts` now carries `{cause: error}`.
- **`prefer-early-return` and `max-member-chain`:** in `registry.acceptance.test.ts` the round-2 handling is flattened so the other path returns early. The three-hop access `lastMessage.content[0]?.content` is replaced by destructuring the first result. Behaviour is unchanged.

The checkout has ajv 6.15.0 in `node_modules`, while `package.json` asks for `^8.20.0`. I didn't touch that, because CI installs from `package.json`.

Prettier left both changed files unchanged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"ajv named import replaced with default-import constructor; added error cause; flattened test mock to satisfy lint rules"}}