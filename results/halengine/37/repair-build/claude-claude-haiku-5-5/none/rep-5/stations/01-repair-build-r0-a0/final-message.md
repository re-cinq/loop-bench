The three CI findings are fixed and pushed to `loop-bench/37`. The branch is in sync with its upstream and merged cleanly with `origin/main`, which was already an ancestor, so no merge commit was needed.

**What was red and what I changed**

1. **typecheck**: `registry.ts:100` used `Ajv` as a value, but the named import `{Ajv}` resolves to a type only. I changed the import to the default `import Ajv from 'ajv'`, which is the class ajv 8 exports.
2. **test**: the same import broke module loading in `registry.acceptance.test.ts` and `config.test.ts` (`does not provide an export named 'Ajv'`). The default import fixes that too.
3. **eslint, `preserve-caught-error`** at `registry.ts:106`: the rethrown error dropped the original. I added `{cause: error}`. The tsconfig target is ES2022, so `ErrorOptions` is available.
4. **eslint, `prefer-early-return` and `max-member-chain`** at `registry.acceptance.test.ts:141-143`: I flipped the `round === 2` guard so the `round !== 2` tail returns early and the happy path runs flat. I also replaced `lastMessage.content[0]?.content` with a destructured `const [toolResult]`. The test's behaviour and assertions are unchanged.

Prettier reported both changed files as already formatted.

**What I did not verify**

- I ran no tests, lint, or typecheck. The pod's `node_modules` holds ajv 6.15.0, while the lockfile pins 8.20.0, so a local run would not test this branch. The fixes are verified by reading the code and the CI annotations only.
- The lore failure-trace tool was not reachable under any name I could find, so I did not check the graph for earlier failures on these files.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"ajv named import is type-only (default import now), missing error cause, and two lint findings in registry.acceptance.test.ts"}}