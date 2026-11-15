The fixes are pushed to `loop-bench/37`. The branch was already up to date with `origin/main` and isn't ahead of its upstream. I couldn't run the full suite here (the pod's hook blocks it), so CI is the final check on this push.

**The `Ajv` errors (typecheck and test).** The import `import {Ajv} from 'ajv'` is right. The lockfile pins ajv 8.20.0, which exports `Ajv` by name. Both errors are what you get when ajv 6.15.0 is installed instead, and that's what this pod had in `node_modules`, left over from before the branch added ajv 8. After running CI's own install step (`npm ci --ignore-scripts`), the error went away without any code change. If CI reports it again, CI's install is stale too (for example a cached `node_modules`), because the code and lockfile are consistent.

**eslint (3 findings, all fixed):**
- `registry.ts:106`: the rethrown compile error now attaches the original error as its `cause`.
- `registry.acceptance.test.ts:141`: the stub provider's `if` is flipped so the round-2 path runs flat. The test checks exactly what it did before.
- `registry.acceptance.test.ts:143`: the three-hop member chain is split up by first pulling out the first tool result.

**The remaining test failures.** With ajv 8 installed, three acceptance tests still failed, because `execute` didn't validate input yet. The previous round left that as its next step, and the build can't go green without it, so I implemented it:
- `ToolRegistry.execute` now checks input against the tool's `inputSchema` before the executor runs.
- On a failure it returns a `ToolResponse` naming the property path and the rule it broke (required, type, enum), never the value. The executor isn't called.
- Static schemas use the validator compiled at `register`. Function-valued definitions are resolved on each call, and their compiled validators are cached per schema object.
- I added a CHANGELOG entry for the new `execute` behaviour.

The registry, acceptance, config and orchestrator test files now pass: 36 of 36.

Not done here, because the red build didn't require it: the README, `docs/adding-a-tool.md` and `.specify/spec.md` updates and the one-line doc comment on `execute` that the ticket asks for.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"ajv 6 was installed instead of the locked 8.20 (Ajv import errors), plus 3 eslint findings and execute not yet validating input (acceptance tests red)"}}