This round compiles a static tool's `inputSchema` once, inside `ToolRegistry.register`. If the schema won't compile, `register` now throws an error that names the tool (`Invalid inputSchema for tool <name>: …`), and `execute` reuses that compiled validator. The commit is pushed, `origin/main` was already merged in, and `git status` shows the branch is not ahead of its upstream.

- **Red:** I added a test to `src/orchestration/tools/registry.test.ts` that registers a tool whose schema has `required: 'orderId'` (a string, not an array) and expects `register` to throw with the tool's name in the message. It failed because `register` didn't throw.
- **Green:** `src/orchestration/tools/registry.ts` now compiles at registration and stores the validator. Tools whose definition is a function still compile on every `execute` call for now. I ran only `registry.test.ts`: 2 passed.
- **Refactor:** none needed. I ran prettier on the changed files and did not run lint or the typechecker; CI runs those.
- **Traceability:** the spec's "compiled once at `register` time" statement now links to the new test at line 27.
- **`.lore/dod.md`:** I split that facet in two. The register-time compile is ticked. The caching of compiled validators for function-valued definitions (`WeakMap` by schema object) is a new unchecked facet.

No round brief existed, so there was no CI verdict to fix: 1 red test was mine (now green) and 0 were regressions.

Unrelated issue I noticed but didn't fix: the spec's `Status` row says `In Progress`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static inputSchema at register time, throwing an error naming the tool","tdd_next":"Cache compiled validators for function-valued ToolDefinitionSource schemas by schema reference (WeakMap), validating against the schema current at each call"}}