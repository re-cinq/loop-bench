The three named failures are fixed and pushed to `loop-bench/37` (7ccea88 → 38a9a03). The branch is in sync with its upstream and merged with `origin/main`, which was already up to date.

**What was broken and what I changed**

- **typecheck** (`registry.ts:100`): `import {Ajv} from 'ajv'` is a type-only export. I changed it to `import Ajv from 'ajv'`.
- **test** (`ajv does not provide an export named 'Ajv'`): same import, which also fails at runtime under ESM.
- **eslint** `registry.ts:106` (`preserve-caught-error`): the rethrown error now carries `{cause: error}`.
- **eslint** `registry.acceptance.test.ts:141`: flipped the `round === 2` guard to `round !== 2` so the happy path runs flat.
- **eslint** `registry.acceptance.test.ts:143` (`max-member-chain`): destructured `const [firstResult] = lastMessage.content` before reading `.content`.

**A choice beyond the named findings**

After the import fix, the suite loaded but three acceptance tests failed. `execute` never called the validator. The verdict named only the module-load error, so this went past it. I implemented the minimum those tests assert:
- `execute` validates input before the executor runs and returns a `ToolResponse` naming the failing field and constraint (`"location" is required`, `"ssn" must be string`).
- Rejections are logged with field and constraint only, never values.
- Compiled schemas are cached per schema object, and the resolved definition is compiled per call, so function-valued sources are not validated against a stale schema.

**Environment**

The pod's `node_modules` had ajv 6.15.0 while the lockfile pins 8.20.0. I ran `npm ci --ignore-scripts` to match the lockfile, which is setup for running tests, not a rebuild.

**What I ran**

- `prettier --check` on the two changed files: passes.
- Jest on `registry.acceptance.test.ts`, `config.test.ts` and `registry.test.ts`: 3 suites, 14 tests, all pass.

I did not run typecheck or eslint here, per the pod rules. Those two findings are fixed by reading the lines, so CI on the new push is the real check.

**Not done**

The ticket's docs, spec, CHANGELOG and remaining test work are outside this red build and were left alone.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"ajv default import, error cause, acceptance test lint, and input validation in execute so the registry suites pass"}}