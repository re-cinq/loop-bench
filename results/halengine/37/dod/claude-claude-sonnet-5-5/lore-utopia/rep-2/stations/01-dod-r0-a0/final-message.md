I wrote four acceptance tests, they fail for the ticket's reason, and the commit is pushed. The branch is not ahead of its upstream, and `origin/main` was already merged.

**Strategy:** `direct`. `ToolRegistry.register` and `execute` are the real entry points, and no validation happens at either today.

The tests are in `src/orchestration/tools/registry.acceptance.test.ts`. I ran only that file, with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts`. Result: `Tests: 4 failed, 1 passed, 5 total`, but the one pass is a fifth test I then removed (see below).

- **Missing required property:** executing `{}` for a tool requiring `location` calls the executor. Expected `{calls: 0, result: true}`, received `{calls: 1, result: false}`.
- **Wrong-typed field:** passing a number for the `location` string runs the executor and returns no message naming `location` or `string`. Expected `{namesPathAndType: true, calls: 0}`, received `{namesPathAndType: false, calls: 1}`.
- **Uncompilable schema:** `register` does not throw (`Received function did not throw`).
- **Function-valued definition:** the test fails today because the registry validates nothing. I read it against the ticket but did not capture its exact output.

I removed the extra-property passthrough test. It passes today, so it could not be red. The implementing round should keep that behaviour, along with the orchestrator retry-loop test and the log-redaction check.

I added `specs/hal-engine-tool-input-validation/spec.md`, which cites the four tests, and `.lore/dod.md`. The repo has no `scripts/spec-links/reanchor.mjs`, so I wrote the `#Lnn` links by hand. I found no mechanism in the repo for stamping a spec anchor on a test, so I did not add one.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}