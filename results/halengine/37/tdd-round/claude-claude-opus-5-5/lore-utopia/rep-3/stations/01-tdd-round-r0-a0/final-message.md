This round closed one facet: `ToolRegistry.execute` now rejects input that is missing a `required` property. It returns a `ToolResponse` saying what's wrong and never calls the executor. The change is committed and pushed, the branch is level with `origin/loop-bench/37`, and merging `origin/main` changed nothing.

- **Red:** I added `src/orchestration/tools/registry.test.ts` with one test: "returns a result naming location as required and runs no executor for {}". It failed for the expected reason: the executor ran and returned `'sunny'`.
- **Green:** I added `ajv@^8.20.0` to `dependencies`. `eslint` keeps its own nested `ajv@6`. `execute` now checks the input against the tool's `inputSchema` with ajv (`strict: false`, `validateFormats: false`, no type coercion, no defaults) and returns `{result: "Invalid input for <tool>: input must have required property 'location'"}`. The new test passes; it is the only test I ran here.
- **Refactor:** the change is four lines with no duplication, so I left it as is.
- **Traceability:** the first statement in `specs/hal-engine-tool-input-validation/spec.md` now links to the new test at `#L10`. The repo has no `scripts/spec-links/reanchor.mjs`, so I checked that line number by hand.
- **`.lore/dod.md`:** I ticked the `ajv` dependency facet and the new required-property facet. I added an unchecked facet for the MINOR version bump (0.3.0 → 0.4.0).
- **Red tests:** I can't count them yet. This was the first round, so there was no round brief and no CI verdict to read. Two red results are likely on this push:
  - `scripts/check-changelog.sh` fails any change to `src/` without a `CHANGELOG.md` entry, and that entry belongs to a later facet.
  - The wrong-typed-property acceptance test may still fail, because rejections don't log anything yet. The rest of it should now pass.
- **Next round:** compile a static schema once at `register` time, throw an error that names the tool for a schema that won't compile, and cache function-valued schemas in a `WeakMap`. Right now `execute` compiles the schema on every call.

**Problems I noticed but didn't touch:**
- `ToolRegistry.get` and `getDefinitions` call a function-valued definition source again on every call.
- `register` silently overwrites a tool that has the same name.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"execute rejects input missing a required property with a ToolResponse and never calls the executor (ajv added to dependencies)","tdd_next":"compile static inputSchema once at register time and throw naming the tool on an invalid schema; WeakMap cache for function-valued schemas"}}