I fixed and pushed the three errors CI reported, but the `test` check will most likely still be red. Three of the branch's own acceptance tests fail locally because the feature they test isn't written yet.

**What I fixed (pushed to `loop-bench/37`, already up to date with `origin/main`, nothing unpushed):**
1. **typecheck** (`src/orchestration/tools/registry.ts:100`) and **test** ("module 'ajv' does not provide an export named 'Ajv'"): ajv 8 is a CommonJS package, so the named import works for neither TypeScript nor Node. It now uses `import AjvModule from 'ajv'` and `new AjvModule.default(...)`.
2. **eslint** `preserve-caught-error` (`registry.ts:106`): the rethrown "Invalid inputSchema" error now carries `{cause: error}`.
3. **eslint** `prefer-early-return` and `max-member-chain` (`registry.acceptance.test.ts:141,143`): I flipped round 2 of the stub provider to an early-return guard and took the first content block out with a destructure. What the test checks is unchanged.

**What I ran:** my local `node_modules` had ajv 6.15 instead of the 8.20.0 the lockfile pins, so I installed 8.20.0 without saving it, then ran `npm test -- src/orchestration/tools src/config.test.ts`.
- `registry.test.ts` and `config.test.ts` now load and pass.
- 3 tests in `registry.acceptance.test.ts` fail on their assertions: the executor is still called with bad input, and nothing tells the model that `location` is required.

Those tests were written red on purpose. The previous round's "Next" step was to add validation to `ToolRegistry.execute`, and that hasn't been done. It's the ticket's main feature rather than a build fix, so I didn't write it here. The build turns green once that step lands.

I didn't run the linter or the typecheck in this pod, as instructed. CI will confirm both on this push.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"fixed ajv import, preserve-caught-error and 2 acceptance-test lint errors; jest on src/orchestration/tools still fails 3 acceptance tests until execute() validates input (unimplemented ticket step)"}}