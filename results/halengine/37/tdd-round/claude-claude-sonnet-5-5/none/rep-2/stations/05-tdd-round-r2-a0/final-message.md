This round fixed the red build from the last push and added one new test. Everything is pushed, and the branch is level with its upstream after merging `origin/main` (nothing to merge).

CI's typecheck and test failures traced to `registry.ts`. The earlier repair had written `new AjvModule.Ajv(...)`, which isn't a constructor at runtime or in the types. I changed it to `new AjvModule(...)`. I also read `missingProperty` through a narrow cast instead of assigning `e.params` to a `Record`. That covers all four typecheck findings, since the `instancePath` error looked like a cascade from the bad constructor type. I haven't confirmed that, because the typechecker can't run in this pod.

The new test, in `registry.test.ts`, checks that `execute` throws `Unknown tool: missing_tool` for an unregistered name. I linked it from its statement in `specs/hal-engine-tool-input-validation/spec.md` and ticked it off in `.lore/dod.md`. `registry.test.ts` passes (4 of 4) when run with jest's ESM flag. I did not run the acceptance tests, lint or the typechecker here.

All the red tests were from my own earlier work; none were regressions in tests that already existed.

Still open for the next round:
- Unit tests for required input, wrong type, register throwing, and the no-leak log check.
- The `chatOrchestrator.test.ts` tool-loop test.
- The one-line doc comment on `execute`.
- Updates to the docs, README, `.specify/spec.md`, ADR-002 and the weather-tool example.

One smell I left alone: prettier re-indents the continuation lines in `.lore/dod.md`, so I don't format that file.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI repair (Ajv constructor, params typing) plus unknown-tool unit test","tdd_next":"registry.test.ts required/wrong-type/register-throws/no-leak tests, chatOrchestrator tool-loop test, execute doc comment, docs"}}