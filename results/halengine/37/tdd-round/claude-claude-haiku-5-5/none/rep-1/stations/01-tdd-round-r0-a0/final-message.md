Round delivered and pushed: `a7df5c9` is on `loop-bench/37`, the branch is not ahead of its upstream, and `origin/main` is merged in with no conflicts.

**Closed this round:** the static-schema part of facet 2. `ToolRegistry.register` now compiles the resolved `inputSchema` with ajv and throws `Invalid inputSchema for tool <name>: …` when it fails.

**TDD round**
- RED: one new unit test in `src/orchestration/tools/registry.test.ts` (throws naming the tool for an uncompilable schema). I ran it and it failed because nothing threw, which is the expected reason.
- GREEN: added `ajv` `^8.20.0` to `dependencies`, and added the compile-and-rethrow to `register`. The test passes.
- REFACTOR: I removed a stored validator field that nothing read yet. The test is still green and Prettier passes on the two changed source files.

**Tests**
- Red tests I wrote: 1, now green. Regressions: none known. I did not run any acceptance tests or the wider suite, per the round rules. No round brief or CI verdict existed on this branch, so there was no CI failure list to work from.
- The `lore_*` tools (including `lore_query_trace`) were not available to me, so I did not run the `tests_covering` check before editing `registry.ts`. Nothing else in the repo was checked against it.

**Open work**
- The new test does not yet cite a spec statement. `re-lint/require-spec-link` will likely fail the CI build on this push. The next round needs to add the `([validated by …])` link in `specs/hal-engine-tool-input-validation/spec.md`.
- Facet 1 is only partly done: `ajv` is in `dependencies`, but the MINOR version bump is still open.
- New unchecked facet: cache compiled validators for function-valued sources by object reference (`WeakMap`), compiled per call.
- Not started: input validation in `execute`, and the remaining facet-4 tests and docs.

**Smells noticed, not fixed:** `ToolRegistry.execute` still logs `inputKeys` and the `Unknown tool` throw is intentional per the ticket. `registry.acceptance.test.ts` is CI's, so I left it alone.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"static inputSchema compiled at register time (facet 2, static part)","tdd_next":"validate input in ToolRegistry.execute before the executor runs (facet 3), plus WeakMap cache for function-valued sources and the ajv MINOR version bump"}}