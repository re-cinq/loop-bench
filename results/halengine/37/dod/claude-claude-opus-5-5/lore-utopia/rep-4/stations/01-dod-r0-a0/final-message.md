I added four failing acceptance tests for #37, plus a new spec and `.lore/dod.md`, and pushed them to `loop-bench/37`. The branch is already up to date with `origin/main` and has nothing left unpushed. All four tests fail because the executor still runs on input the schema rejects. That is the ticket's own complaint, not a setup problem.

**Strategy: `direct`.** `ToolRegistry.execute` and `register` are already real entry points, so the tests call them on a real registry with real schemas. The fourth test runs the real `createChatOrchestrator` tool loop with a scripted provider. There are no mocks.

**Files:**
- `src/orchestration/tools/registry.acceptance.test.ts`: the four tests.
- `specs/hal-engine-tool-input-validation/spec.md`: new spec, `Status: In Progress`. Each of its statements cites one test at its `#Lnn` line. The "`Unknown tool` still throws" statement has no test yet; the round that implements the ticket will add one.
- `.lore/dod.md`: the triage, the done-when list and the remaining steps for the next round.

**Failure output** (`NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts`):
```
● ToolRegistry input validation › returns a rejection naming the missing required property and never runs the executor
    -   "executorCalls": 0,
    -   "namesLocation": true,
    -   "saysRequired": true,
    +   "executorCalls": 1,
    +   "namesLocation": false,
    +   "saysRequired": false,

● ToolRegistry input validation › rejects a wrong-typed field by path and expected type without echoing any input value to the result or the log
    -   "executorCalls": 0,
    +   "executorCalls": 1,
        "leakedValues": Array [],
    -   "namesExpectedType": true,
    -   "namesPath": true,
    +   "namesExpectedType": false,
    +   "namesPath": false,

● ToolRegistry input validation › throws at register time for an uncompilable inputSchema, naming the tool
    Expected pattern: /broken_tool/
    Received string:  "registered without throwing"

● ChatOrchestrator with a rejected tool call › feeds the rejection back to the provider and resolves after a corrected retry
      Object {
        "executorInputs": Array [
    +     Object {},
          Object {
```

In the second test, `leakedValues` already passes: today's logs carry only the input's key names, not its values. That check guards against the new rejection messages leaking values once validation exists.

The ticket's other test criteria are left to the implementing round, which writes them in its own `registry.test.ts` and `chatOrchestrator.test.ts` as listed in `.lore/dod.md`. These are: extra properties passing through unchanged, the schema current at each call for function-valued definitions, compiling a static schema once across ten calls, and the `Unknown tool` throw staying as it is. Each of those either passes today or depends on validation already existing, so none would be an honest red test now.

I didn't run lint, the typechecker or the full suite here. CI will be the first to check the new spec's `Status` row and its link format.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}