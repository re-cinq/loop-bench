This round fixed CI's three failures and added input validation to `ToolRegistry.execute` for statically defined tools. It's committed as `ab5b560` and pushed; `origin/main` merged in with nothing new, and the branch is level with its upstream.

**CI findings from the last push:**
- **typecheck and test:** The ajv import was the cause. Jest couldn't load the `Ajv` named export, so every suite that imports the registry failed, and tsc rejected it too. `registry.ts` now uses `import AjvModule from 'ajv'` and `new AjvModule.default(...)`. Jest now loads `registry.test.ts` again. The typecheck fix hasn't been confirmed yet; the next CI run will show it.
- **eslint:** Both findings were in `registry.acceptance.test.ts`. I changed only the shape of the stub provider's round-2 branch (an early return, and the 3-hop member chain split in two). The assertions and the test's behaviour are unchanged. You should know I edited an acceptance test file at all, even if only for lint.

**This round's facet:**
- **Red:** a new test in `src/orchestration/tools/registry.test.ts` (line 21). It registers a tool that requires `location`, calls `execute` with `{}`, and expects a result naming `location` as required and 0 executor calls.
- **Green:** `execute` checks the input against the schema compiled at register time. On failure it returns `{result}` built from each error's property path and ajv's message, which names the constraint but never the input value. The executor isn't called.
- **Refactor:** added the one-line doc comment on `execute` pointing at the spec, linked the new test from the "omits a required property" statement in `specs/hal-engine-tool-input-validation/spec.md`, and ran prettier. The repo has no `reanchor.mjs`, so I checked the existing `#L` links by hand; they all still match.

**Tests:** I ran only `registry.test.ts`: 2 of 2 pass. Of the red tests in the last CI verdict, none were regressions. The `config.test.ts` failure had the same ajv import cause, and the other red tests are the ticket's own tests. The `registry.test.ts` suite (last round's test) runs and passes here again.

**Next:**
- In `.lore/dod.md` I ticked the validate-in-`execute` facet and added a new unchecked one: rejections currently produce no log line, and the ticket wants one naming only the failing paths and constraint.
- Function-valued tool definitions are still not validated. That is the next facet, and the orchestrator acceptance test needs it.

No unrelated smells to report.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate input in ToolRegistry.execute (static schemas) returning a rejection ToolResponse naming failing paths; fix ajv ESM import and acceptance-test lint findings","tdd_next":"Cache compiled validators for function-valued ToolDefinitionSource schemas by schema object reference (WeakMap) and validate them in execute"}}