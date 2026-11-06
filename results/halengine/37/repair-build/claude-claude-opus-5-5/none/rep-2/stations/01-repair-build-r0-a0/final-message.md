I fixed all three named failures and pushed them, but the `test` check will stay red: three acceptance tests fail because `ToolRegistry.execute` doesn't validate input yet.

**What was broken and what changed:**
1. **typecheck and test: `'Ajv' only refers to a type` / `no export named 'Ajv'`.** ajv 8 is a CommonJS package, so Node can't import `{Ajv}` from it by name. `registry.ts` now imports the package's default export and builds the validator from `AjvModule.default`, which works both at runtime and in the type check.
2. **eslint `preserve-caught-error` (`registry.ts:106`).** The error thrown for a broken schema now carries `{cause: error}`.
3. **eslint `prefer-early-return` and `max-member-chain` (`registry.acceptance.test.ts:141,143`).** I flattened the stub provider's round-2 branch into an early-return guard and read the first tool result through `const [firstBlock] = lastMessage.content`. The test asserts the same things as before.

**What I ran:** the local `node_modules` had an old ajv 6.15 while the lockfile pins 8.20, so I ran `npm ci --ignore-scripts`. Then I ran jest on `registry.test.ts`, `config.test.ts` and `registry.acceptance.test.ts`: 11 passed, 3 failed. All three failures are in the acceptance file, which was committed red on purpose:
- a missing required property is not rejected
- a wrong-typed property is not rejected
- the orchestrator does not get a rejection back to retry with

They fail because validating input in `execute` is the next unfinished item in `.lore/dod.md`, not because of anything in this verdict. Building that is the next implementation round, so I didn't add it here. I didn't run typecheck or eslint locally, as instructed; CI will judge them on this push.

The commit is pushed to `loop-bench/37`. `origin/main` was already merged in, and the branch is level with its upstream.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"fixed ajv import, preserve-caught-error and both test lint errors; jest on the registry suites still fails 3 acceptance tests that wait on the unbuilt execute() validation"}}