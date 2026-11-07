I fixed and pushed all three red checks (typecheck, eslint and test) on `loop-bench/37`. The branch is already up to date with `origin/main` and has nothing left unpushed.

**The `ajv` errors (typecheck and test) came from the environment, not the code.** The code and lockfile were already right: the lockfile pins `ajv` 8.20.0, which exports `Ajv` as a value. But the `node_modules` CI judged against still had the old `ajv` 6.15 at the top level, which has no `Ajv` export. That's why the type error and the "does not provide an export named 'Ajv'" test errors appeared. Running `npm ci --ignore-scripts` here installed 8.20.0 and those errors went away. If CI's install somehow still produces `ajv` 6, it will stay red there.

**The acceptance tests needed the feature itself.** With `ajv` resolved, 3 of the 4 acceptance tests still failed because `ToolRegistry.execute` didn't validate input yet; that was the previous round's "Next" step. I implemented it in `src/orchestration/tools/registry.ts`:
- Input is checked against the schema before the executor runs. A rejection comes back as `{result: 'Invalid input for tool "<name>": <path> <ajv message> (<keyword>)'}`, and the warning log lists only paths and keywords, never the input values.
- A static tool's schema is compiled once when it is registered. A function-valued definition is compiled per resolved schema and cached in a `WeakMap` keyed on that schema object.
- `Unknown tool: <name>` still throws, unchanged.
- `execute` has a one-line doc comment pointing at the spec.

**The eslint findings:**
- `registry.ts:106` (`preserve-caught-error`): the schema-compile error now carries `{cause: error}`.
- `registry.acceptance.test.ts:141` and `:143`: I flattened the round-2 branch of the stub provider into an early return, and replaced `lastMessage.content[0]?.content` with destructuring. The test asserts exactly what it did before.

**Checks run here:** the jest suites for `src/orchestration` (31 tests) and for `src/config.test.ts` plus `src/orchestration/tools` (14 tests) all pass, and prettier was run on both changed files. As instructed, I did not run eslint or typecheck here, so the lint fixes and types are only confirmed once CI runs on the push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"stale ajv 6 in node_modules broke the import, execute never validated input so the acceptance tests stayed red, and 3 eslint errors; implemented validation and fixed the lint findings"}}