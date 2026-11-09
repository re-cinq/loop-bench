Push landed; `origin/main` has nothing the branch lacks, so no merge or second push was needed and `git status` shows the branch level with its upstream.

## Round summary

**Facet closed:** `ToolRegistry.execute` validates `input` against the resolved definition's `inputSchema` before invoking the executor, returning a rejection `ToolResponse` (plus facet 1, inseparable from the implementation: `ajv@8.20.0` into `dependencies` + lockfile, version bumped `0.3.0` → `0.4.0`, `strict: false` / `validateFormats: false`, no coercion/defaults/`additionalProperties` injection).

**TDD round:**
- **RED** — new `src/orchestration/tools/registry.test.ts` (the registry's first test file), one test: *rejects a call missing the required location and never calls the executor*. Failed for the expected reason: `executorCalls` was `1` with no validation present.
- **GREEN** — 7 lines in `registry.ts`: validate with the class's Ajv instance, return `{result: errorsText}` on failure, never reaching the executor. Verified the rejection shape directly: missing required → `data must have required property 'location'`; wrong type → `data/location must be string` (path + expected type, and ajv error objects carry no values, so nothing leaks to result or logs); extra properties pass through unvalidated-in.
- **REFACTOR** — nothing to collapse: one call site, no duplication; register-time compilation deliberately left alone (that's the next facet, and adding it now would be code without a failing test of its own).
- Ran only my test file, by path, from the repo root. The acceptance tests in `registry.acceptance.test.ts` were **not** run — CI is their judge; the four of them stay red until later rounds, which is the ordinary mid-ticket state.

**Traceability:** the test's spec statement in `specs/hal-engine-tool-input-validation/spec.md` now carries a second `([validated by ...])` citation pointing at `registry.test.ts#L4` (the `it(` line; no cited file was edited, so no existing anchors drifted). `CHANGELOG.md` gained an npm-reader-facing `Unreleased` entry — required by `check-changelog.sh` since a non-test `src/` file changed — and `.lore/dod.md` ticks facets 1 and 3.

**Red tests:** none are mine besides the one I turned green; CI has no verdict yet for the branch (gateway returned "branch not found" — no PR exists), so I can't attribute anything to regressions; from reading the other suites, no existing fixture sends schema-violating input through `execute` (the orchestrator tests register a permissive `{type: 'object'}` schema).

**Smells noticed, not acted on:** the compile happens at `execute` time through ajv's internal serialize-cache — correct today, replaced next round by the register-time facet; and the logger accepts arbitrary fields with no central redaction seam, so the no-value discipline for future log lines rests on each call site.

**Next facet:** compile a static `ToolDefinition.inputSchema` once at `register` time (throwing synchronously, naming the tool) and cache function-valued-source validators by schema object reference (`WeakMap`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"validate input in execute before the executor, returning a rejection ToolResponse without value echo (with ajv in dependencies + MINOR bump)","tdd_next":"compile static inputSchema at register time with WeakMap caching for function-valued sources"}}