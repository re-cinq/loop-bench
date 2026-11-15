I fixed all three red checks and pushed. The branch is level with `origin/loop-bench/37` and already up to date with `origin/main`. I couldn't get CI's report directly (`lore_get_ci_failures` returned "branch not found"), so I worked from the round brief. There were no recorded past failures on `registry.ts`.

**typecheck and test: `'Ajv' only refers to a type` / `no export named 'Ajv'`.** The import was already correct. ajv 8.20.0, which the lockfile pins, exports `Ajv` as a class in its type declarations and at runtime, and both errors are exactly what ajv **6.15** gives. This pod's `node_modules` had ajv 6.15 at the root because it was installed from main's lockfile before this branch added the dependency. I ran CI's own install step (`npm ci --ignore-scripts`) and got ajv 8.20.0, and the import resolved. Neither the lockfile nor `package.json` needed changing. If CI really ran these checks on a fresh `npm ci`, it should not have seen these errors — worth looking at if they come back.

**Acceptance tests.** Once the suite could load, 3 tests in `registry.acceptance.test.ts` failed because `execute` didn't validate yet (the previous round's "Next" step). I implemented that in `src/orchestration/tools/registry.ts`:
- `execute` checks input against the tool's `inputSchema` before running the tool.
- A static tool reuses the validator compiled at registration; a tool whose definition comes from a function is compiled per schema and cached.
- On failure it returns `{result}` naming the failing property paths and which rule failed, logs the same without values, and never calls the tool.
- An unknown tool name still throws `Unknown tool: <name>`.

**eslint:**
- `registry.acceptance.test.ts:141` (`prefer-early-return`): flipped to `if (round !== 2)` so the round-2 path runs flat.
- `registry.acceptance.test.ts:143` (`max-member-chain`): replaced `lastMessage.content[0]?.content` with a destructured `firstResult`.
- `registry.ts:106` (`preserve-caught-error`): the schema-compile error is now rethrown with `{cause: error}`.

I added a CHANGELOG line for the validation and ran prettier on the three changed files. Locally, `jest src/orchestration src/config.test.ts` passed 5 suites and 40 tests. Per the instructions I did not run eslint or typecheck here, so CI will be the first to check those on the new commit.

The ticket's docs updates (`README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`) and several of its acceptance tests are still not written. Those are outside this fix.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"ajv errors came from stale ajv 6 in node_modules (works with locked 8.20); added the missing input validation in ToolRegistry.execute so acceptance tests pass; fixed 3 eslint findings"}}