This round added and pushed one test, and I couldn't reproduce the CI failure it was meant to address. The branch is level with its upstream and the merge of `origin/main` produced nothing to push.

- **CI failure:** CI reported `rejects a value outside the declared enum without calling the executor` failing, with the path rendered as `(root)` instead of `/unit`. That test passes here, with and without coverage, and the log line shows `/unit`. I changed no `src/` code for it. If CI is still red on this test, the cause is something in the CI environment that I can't see from here.
- **Test added:** `throws Unknown tool for an unregistered name` in `src/orchestration/tools/registry.test.ts`. It pins that `execute` still throws `Unknown tool: <name>`.
- **Spec link:** I linked that test on the statement in `specs/hal-engine-tool-input-validation/spec.md`.
- **Checklist:** I updated `.lore/dod.md` to record the unknown-tool test as done. The last facet stays unchecked.
- **Test run:** only `registry.test.ts` was run, and all 3 tests pass. I ran no acceptance tests, and I ran no lint or typecheck.
- **Red tests:** none this round were regressions. One test of mine was reported red, and I couldn't reproduce it.

The next round takes the dynamic-schema and compile-once unit tests, the orchestrator retry test, the doc and `CHANGELOG.md` updates, and the spec `Status` row. The spec still says `In Progress`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"unknown-tool throw pinned and spec-linked","tdd_next":"dynamic-schema and compile-once unit tests; orchestrator retry test; docs/README/.specify/ADR-002/example/CHANGELOG; spec Status"}}