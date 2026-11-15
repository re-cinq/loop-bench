The three acceptance tests for ticket #37 are committed and pushed to `loop-bench/37` (commit `ae4a10e`). The branch is level with its upstream and already contains `origin/main`, so no merge was needed.

**Strategy: `direct`.** `ToolRegistry.register` and `execute` are public and take the definition and input directly, so the tests call the real entry point.

Central claim, quoted in `.lore/dod.md`: "`ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`".

**Red bar.** I ran the file in this pod with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts`. All three fail for the reason the ticket states:

```
● returns a rejection naming a missing required property and never runs the executor
    Expected substring: "location"
    Received string:    "Sunny in Lisbon"

● returns a rejection naming the field path and expected type, without echoing the offending value
    Expected substring: "location"
    Received string:    "Sunny in Lisbon"

● throws at register time for a schema that will not compile, naming the tool
    Expected substring: "broken_tool"
    Received function did not throw

Tests:       3 failed, 3 total
```

The first two show the executor running on malformed input. The third shows `register` accepting an uncompilable schema.

**What I wrote**
- `src/orchestration/tools/registry.acceptance.test.ts`: three tests, one per behaviour above. The file name follows the `.acceptance.test.ts` rule, not the ticket's `registry.test.ts`.
- `specs/hal-engine-tool-input-validation/spec.md`: new spec, Status `Draft`, with three statements, each citing its test. The `spec:names` and `check:spec-status` checks pass on it.
- `.lore/dod.md`: the DoD in the required shape. Its Facets list the rest of the ticket's acceptance criteria.

**Choices I made that you may want to change**
- I kept three tests, not the ticket's full list. Extra-property passthrough is left out because it passes today, so it cannot be red. Compile-once, per-call schema resolution, the orchestrator retry loop, log redaction, the docs, the changelog and the `ajv` dependency are Facets for later rounds, not tests here.
- The spec file is new because `specs/hal-engine-tool-input-validation/spec.md` did not exist. The ticket asks for it.
- I did not add `ajv`. The tests do not import it, so no production change was needed.
- I did not run lint or typecheck, per the pod rules. Prettier ran on the three files.

Lore MCP tools were not used.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}