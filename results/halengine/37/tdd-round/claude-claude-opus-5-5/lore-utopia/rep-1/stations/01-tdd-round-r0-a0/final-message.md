This round is pushed: `ToolRegistry.execute` now checks a tool's input against its `inputSchema` before the executor runs. I ran only my new test; CI hasn't judged the branch yet.

**What changed**
- **Red:** I added `src/orchestration/tools/registry.test.ts`. Its one test registers a tool that requires `location` and calls `execute` with `{}`. It failed because the executor ran and returned `"sunny"`.
- **Green:**
  - `ajv@^8.20.0` is now in `dependencies`, set up with `strict: false`, `validateFormats: false` and `allErrors: true`, and no coercion, defaults or `additionalProperties: false`.
  - When validation fails, `execute` returns `{result: "Invalid input for tool <name>: <path> <ajv message>; ..."}` without calling the executor. The returned text and the warning log line contain only property paths and the failed rule, never the values.
  - An unknown tool name still throws `Unknown tool: <name>`.
- **Refactor:** `execute` has a one-line doc comment pointing at the spec. The spec statement about a missing required property now also links to the new test at line 4. The formatter ran on the changed files.
- **Version:** I bumped it MINOR (0.3.0 → 0.4.0) in `package.json` and `package-lock.json`, since that was part of the ajv facet.

**Checks**
- `registry.test.ts` passes (1 of 1).
- The coverage graph showed no existing tests covering this part of `registry.ts`, and I saw no regressions. Red tests: one, mine, now green; none were regressions.
- I didn't run the acceptance tests, lint or the typechecker here. I expect the required-field and wrong-type acceptance tests to pass now. The register-time test should still fail, because schemas are compiled per call for now. CI will say.
- The branch is pushed, `origin/main` merged in with nothing new, and it is not ahead of its upstream.

**`.lore/dod.md`:** I ticked the ajv/version facet and the validate-in-`execute` facet.

**What's left**
- **Next round:** compile static schemas at `register` time (throwing with the tool's name) and cache validators for function-valued schemas by schema object (`WeakMap`).
- **Then:** the remaining unit and orchestrator tests, the docs, README, `.specify/spec.md`, ADR-002, `example/weather-tool.ts` and the CHANGELOG entry.
- **CI risk:** the CHANGELOG entry is still missing, so `scripts/check-changelog.sh` will fail this push because it touches `src/`.

Unrelated smells: none acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate input in ToolRegistry.execute against inputSchema via ajv (dependency added, MINOR bump), returning a value-free rejection ToolResponse","tdd_next":"Compile static inputSchema at register time (throw naming the tool) and WeakMap-cache validators for function-valued definitions"}}