Done. The ticket's branch is pushed with the red acceptance suite, the spec statements it validates, and the DoD.

## What I did

**Triage: `direct`** — the seam already exists (`ToolRegistry.register`/`execute`), so every test calls the real entry point and fails on behaviour. The registry has no test file, so the contract lives in a new `src/orchestration/tools/registry.acceptance.test.ts` (5 tests, one `expect` each, per `re-lint/max-expects`). The spec the ticket names didn't exist yet, so I wrote `specs/hal-engine-tool-input-validation/spec.md` — statements first, each citing its test in the repo's `([validated by: …](…#Lnn))` form; `spec:names`, `check:spec-links` and `check:spec-status` all pass. Two ticket pins that already hold today (input passed through `toEqual`-unchanged; `Unknown tool:` still throwing) ride inside the red tests rather than standing as green-at-birth ones — noted in `.lore/dod.md`. No production code touched.

## The red bar (all 5 fail for the ticket's stated reason — nothing validates input)

```
● …returns a rejection to the model and never runs the executor when a required property is missing, while an unknown tool name still throws
    -   "executorCalls": 0,
    -   "namesProperty": true,
    -   "namesRequired": true,
    +   "executorCalls": 1,
    +   "namesProperty": false,
    +   "namesRequired": false,
```
Today the malformed call returns `"22°C and clear in Unknown"` — the ticket's shipped-example story, verbatim.

```
● …rejects a wrong-typed field naming the path and expected type, and emits the offending value neither in the result nor the log
    +   "executorCalls": 1,  "namesExpectedType": false,  "namesPath": false,  "valueInResult": true,
```
The offending value `48812` currently reaches the returned text.

```
● …throws at registration for a schema no validator can compile, naming the tool
    +   "messageNamesTool": false,  "rejectedAtRegistration": false,
```

```
● …validates a function-valued definition against the schema current at each call, enum included
    +   "executorCalls": 2,  "secondNamesProperty": false,
```
The stale-schema executor ran a call the current enum rejects.

```
● …feeds a rejected call back to the model so a corrected retry succeeds, passing accepted input through unchanged
    +   "outcome": "weather needs a location",
    +   "executorInputs": [Object {} ],
    -   "executorInputs": [ {location: 'Paris', units: 'metric'} ],
```
Today the throw kills the conversation — exactly the tech-note's transport-error path.

Run: `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts` → `Tests: 5 failed, 5 total`. Committed `556093c`, pushed, merged with `origin/main` (already current), branch clean and not ahead of upstream.

**Findings for the next round (not test subjects):** ajv 6.15.0 is already in `node_modules` transitively but absent from `package.json` `dependencies`; the registry's current `log.info('tool', 'executing', {inputKeys})` logs keys only — keep it that way, since the privacy criterion is about values. `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md` (line 29 still says the schema "is NOT enforced"), the CHANGELOG entry and the MINOR bump remain the implementing round's facets.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}