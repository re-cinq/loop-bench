Branch is up to date and clean. This round fixed all CI failures from the last push:

- **spec-names**: 12 stale line anchors in `specs/hal-engine-architecture/spec.md` and `specs/hal-engine-tool-input-validation/spec.md` were repointed by `check-spec-anchor-names --fix` (tests had shifted when new ones were inserted above them)
- **eslint spec coverage**: `specs/hal-engine-config-hooks/spec.md` line 33 (the "accumulateUsage intro" sentence) was a testable statement without a validated-by link; added the link with a trailing `.` so the trailing-paren parser recognizes it (the previous `:` at the end prevented recognition)
- **eslint max-expects**: test at `chatOrchestrator.test.ts#L311` had 2 expect calls; combined into one `toEqual` on a plain object
- **eslint unknown rule**: removed `// eslint-disable-next-line @typescript-eslint/no-throw-literal` (rule was renamed in typescript-eslint v8 and no replacement is needed here)

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI fix: resolved eslint and spec-names failures from last push","tdd_next":"acceptance green"}}