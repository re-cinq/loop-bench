Done. Everything is committed and pushed — the branch is up to date with its upstream, working tree clean, and `origin/main` fully merged (it was already current).

## Triage: `direct`

The seam exists — `ToolRegistry.register`/`execute` is the ticket's named entry point, and the tool loop is reachable through `createChatOrchestrator(...).processMessage` with a scripted provider. No production code was written.

## What landed (commit `4482e7c`)

- **`src/orchestration/tools/registry.acceptance.test.ts`** — 8 tests through the real registry
- **`src/orchestration/chatOrchestrator.inputValidation.acceptance.test.ts`** — 1 tool-loop test through the real orchestrator
- **`specs/hal-engine-tool-input-validation/spec.md`** — the spec the ticket requires (it didn't exist), with 9 statements each carrying an inline `([validated by ...])` link; anchors verified with the repo's own tools (`check-spec-anchor-names`: 394 citations name their tests; `check-spec-links`: 0 misplaced across 1390 statements; `repoint-spec-anchors --check` skips the new spec as AGENTS.md documents for branch-introduced specs)
- **`.lore/dod.md`** — verbatim claim, strategy, tests, facets, out-of-scope

Files run (only these): `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts src/orchestration/chatOrchestrator.inputValidation.acceptance.test.ts`

## Red bar — actual output

**Tests: 7 failed, 2 passed, 9 total.** The 7 fail because validation is absent — exactly the ticket's claim that `execute` "calls the executor without ever checking the declared `inputSchema`":

```
● ... rejects input missing a required property with a ToolResponse naming it, and never calls the executor
    -   "executorCalls": 0,            +   "executorCalls": 1,
    -   "namesProperty": true,         +   "namesProperty": false,
    -   "namesRequired": true,         +   "namesRequired": false,
● ... throws at registration time for a schema that does not compile, naming the tool
    -   "threw": true,                 +   "threw": false,
● ... validates a function-valued definition against the schema current at each call, not a stale one
    -   "firstRejected": true,         +   "firstRejected": false,
    -   "executorCalls": 1,            +   "executorCalls": 2,
● ... compiles a static tool schema once across ten execute calls
    Expected number of calls: 1
    Received number of calls: 0
● ... keeps an identifying input value out of the rejection text and every log line
    -   "rejected": true,              +   "rejected": false,
● ChatOrchestrator ... returns a rejected tool call to the model as a tool result and lets a corrected retry complete
    -   "executorCalls": 1,            +   "executorCalls": 2,
    -   "rejectionReachedProvider": true,  +   "rejectionReachedProvider": false,
```

The 2 greens are deliberate: the ticket pins pass-through-unchanged (`toEqual`, exactly once) and the `Unknown tool: <name>` throw as behaviour that must **stay** — both pass today and guard the change. One coupling is recorded in `.lore/dod.md`: the compile-once test counts calls to the hoisted ajv's public `compile` entry (spied via `Object.getPrototypeOf(new Ajv())`, so either ajv major resolves); a different compiler package would retarget the spy, not delete the test.

Prettier was run over the changed files. Lint, typecheck and build were not run here per pod constraints — CI's `verify` job is the judge, and the changelog gate exempts test-only `src/` changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}