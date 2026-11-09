## Round report — ticket #37, branch `loop-bench/37`

**Facet closed:** the smallest facet that moves an acceptance test to green — `ToolRegistry.execute` now validates `input` against the resolved definition's `inputSchema` before the executor runs, returning a rejection `ToolResponse` naming what failed instead of throwing, so the orchestrator can feed it back as a `tool_result`. That pulled in dod facet 1 as its prerequisite: `ajv@^8.20.0` in `dependencies` (compiled with `strict: false`, `validateFormats: false`, no coercion/defaults/`additionalProperties` injection), version bumped MINOR to 0.4.0, `CHANGELOG.md` entry, and the one-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`.

**TDD phases:**
- **RED** — wrote exactly one test, `registry.test.ts` "rejects missing required input without calling the executor"; ran it by file only. Failed for the expected reason: `executorCalls: 1`, result was `'sunny'` (validation absent).
- **GREEN** — the ajv compile-and-validate block above.
- **REFACTOR** — renamed `problems` → `violations`; bar stayed green.

**Traceability:** the spec statement it validates now carries a second trailing citation (`registry.test.ts#L4`, anchor verified against the written file, name matches the test title for `spec:names`). Prettier run over both changed TS files.

**One honest departure to flag:** `npm install --package-lock-only --dry-run` (lock verification) fired npm's `prepare` hook, which ran the build this pod is told to avoid. It failed naming two type errors in my ajv import (`TS2351` default-import not constructable, plus a cascading `TS7006`), so I fixed them (`import {Ajv} from 'ajv'`) and confirmed with `tsc --noEmit -p tsconfig.build.json` rather than handing CI a known red build. Jest re-run stayed green with the named import.

**Red tests:** CI has no verdict for this branch yet (no round brief; lore returned 404). Expected from the push: acceptance tests 1, 2 and 4 flip green; acceptance test 3 (register-time throw) stays red **by design** — it is the next round's facet, not a regression. Zero regressions expected; CI judges.

**Next facet:** compile a static tool's schema at `register` time (throw naming the tool on uncompilable schemas) and cache function-valued `ToolDefinitionSource` validators by schema reference (`WeakMap`) — driven by acceptance test 3 and the compile-once test.

**Future improvements (not acted on):** rejection messages don't yet carry the failing `instancePath` for wrong-typed fields (ajv's bare message is `must be string`) — the next round's wrong-type unit test drives that; `get()`/`getDefinitions()` re-resolve function sources on every call, same caching concern as the facet above; `@types/express`, `@types/node`, `@types/ws` sit in `dependencies` rather than `devDependencies` (pre-existing).

Committed as `8808187`, pushed, branch up to date with `origin/loop-bench/37` and clean against `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"ajv in dependencies + MINOR bump; execute validates input and returns a rejection ToolResponse without invoking the executor (missing-required facet, unit-tested and spec-cited)","tdd_next":"compile static inputSchema at register time throwing naming the tool, plus WeakMap validator cache for function-valued sources"}}