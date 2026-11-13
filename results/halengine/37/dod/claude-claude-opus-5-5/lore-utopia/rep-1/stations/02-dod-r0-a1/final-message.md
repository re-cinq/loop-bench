The definition of done for #37 was already on this branch from an earlier round, in commit `aef55fc`. I checked it instead of writing it again. It is pushed, current with `origin/main` (the merge changed nothing), and not ahead of its upstream.

**Strategy: `direct`.** `ToolRegistry.register`/`execute` and `createChatOrchestrator` are the real entry points, and the logger's `setLogger` lets a test capture log lines. `.lore/dod.md` opens with the ticket's claim, quoted word for word: "`ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`".

**Acceptance tests** are in `src/orchestration/tools/registry.acceptance.test.ts`. Each one is linked from a statement in `specs/hal-engine-tool-input-validation/spec.md`, at lines 37, 50, 68 and 81 of the test file. Those line numbers match where the tests are, and `check-spec-links` reports 0 misplaced links. I ran them with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts`:

```
● ... › returns a rejection naming the missing required property and never runs the executor
    -   "calls": 0,
    -   "result": StringMatching /location[\s\S]*required|required[\s\S]*location/,
    +   "calls": 1,
    +   "result": "sunny in undefined",

● ... › rejects a wrong-typed field by path and expected type without echoing the value in the result or the logs
    -   "calls": 0,
    +   "calls": 1,
    -   "namesPathAndType": true,
    -   "resultLeaksValue": false,
    +   "namesPathAndType": false,
    +   "resultLeaksValue": true,

● ... › throws at register time for an uncompilable schema, naming the tool
    Expected pattern: /broken_tool/
    Received function did not throw

● ... › resolves processMessage after a rejected call and a corrected retry, showing the provider the rejection
    -   "rejectionNamesField": true,
    +   "rejectionNamesField": false,

Tests:       4 failed, 4 total
```

Each failure comes from the claim itself. The executor runs on input the schema should reject: on `{}` it answers "sunny in undefined", and on a number it echoes the value back. `register` accepts a schema that cannot be compiled, and the model never sees a rejection. None of them fail because of an import or a missing fixture.

The ticket's other required tests are listed as facets for the implementation round, not as acceptance tests:
- passing through an unlisted extra property unchanged, exactly once;
- honouring a schema that changes between calls of a function-valued definition;
- compiling a static schema once across ten calls;
- still throwing `Unknown tool: <name>`;
- the tool-loop test in `chatOrchestrator.test.ts`.

The ticket says where these go: a new `registry.test.ts` and the existing `chatOrchestrator.test.ts`.

The tests only run under `--experimental-vm-modules`, which is how `npm test` already invokes Jest. A bare `npx jest` fails on ESM loading.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}