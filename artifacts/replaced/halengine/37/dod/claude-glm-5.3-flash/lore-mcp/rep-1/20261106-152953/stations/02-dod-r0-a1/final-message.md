Everything is verified in place. The work is complete, committed, and pushed — here is the final state:

## What stands on the branch (`loop-bench/37`, commit `0b9a6b0`, pushed — remote ref matches HEAD)

**Triage: `direct`** — `ToolRegistry.execute` and `chatOrchestrator.processMessage` are real entry points the ticket itself names; the tests drive them against a real registered tool and fail because no validation exists, not because of a missing fixture. Recorded in `.lore/dod.md` together with the ticket's central claim, quoted verbatim.

**Two new test files, 9 tests** (spec statements in `specs/hal-engine-tool-input-validation/spec.md`, each with an inline `([validated by ...])` link — the repo's established form; `check:spec-links` reports 0 misplaced across 1389 statements and every anchor line was verified against the test titles):

| Test | State | Why |
|---|---|---|
| rejects a call missing a required property before the executor runs | **red** | executor ran on `{}`, returned `"ran"` |
| passes a valid input with an unlisted property through unchanged | green (pin) | ticket demands it survives the rewrite |
| rejects a wrong-typed property naming path and expected type | **red** | result `"ran"`, no rejection text |
| surfaces no property value in result or logs | **red** | no rejection exists to redact |
| throws at register time for an uncompilable schema | **red** | `register` accepted `{type: 'strng'}` → `"registered"` |
| compiles a static schema once, reused across execute calls | **red** | 10 calls returned `"ran"` |
| validates function-valued definition against schema current at each call | **red** | stale schema accepted the old input |
| still throws `Unknown tool: <name>` | green (pin) | ticket pins this as unchanged |
| feeds a rejected tool call back to the provider, completes on retry | **red** | see below |

**Actual failure output** (quoted from the run):

```
● ChatOrchestrator › feeds a rejected tool call back to the provider and completes on the corrected retry
    - Expected  - 1
    + Received  + 2
      "executorInputs": Array [
    +     Object {},
          Object { "location": "Kigali" },
        ],
    -   "fedBack": StringMatching /location/,
    +   "fedBack": "ran",

● ToolRegistry › rejects a call missing a required property before the executor runs
    -   "executorInputs": Array [],
    +   "executorInputs": Array [ Object {} ],
    -   "result": StringMatching /location...required/,
    +   "result": "ran",

● ToolRegistry › throws at register time for an uncompilable schema naming the tool
    Expected: StringMatching /weather/
    Received: "registered"
```

Every red bar is the ticket's own claim: the executor runs on malformed input, no rejection `ToolResponse` is returned, `register` accepts an uncompilable schema. Result: **7 failed, 2 passed, 9 total**.

Run command (only these two files, by path):
```
node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts src/orchestration/chatOrchestrator.acceptance.test.ts
```

Delivery checks: prettier passes on both test files and the spec; branch is 0 commits behind `origin/main` (no merge needed, no conflicts); working tree clean; `git status` reports up to date with `origin/loop-bench/37`, and `git ls-remote` confirms `0b9a6b0` is on the remote. No production code was written — no validation, no `ajv`, no doc edits; that is the implementing round's work, with the facets listed in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}