Done. Commit `bfc1fde` is pushed to `origin/loop-bench/37`, the tree is clean, and `origin/main` merges with no conflicts.

## What I did

**Triage: `direct`** — the seam already exists. `ToolRegistry.register`/`execute` and `createChatOrchestrator(...).processMessage` are public entry points; every test drives the real registry and the real orchestrator with real values (the only swapped collaborator is the process logger, via the shipped `setLogger` seam). No production code was written.

Four files, all new:
- `src/orchestration/tools/registry.acceptance.test.ts` — 9 tests
- `src/orchestration/chatOrchestrator.acceptance.test.ts` — 1 tool-loop test (rejected call → corrected retry)
- `specs/hal-engine-tool-input-validation/spec.md` — the contract, 10 statements, each carrying the `([validated by ...])` link to its test. Verified with the repo's own checkers: `check-spec-links` (0 misplaced, 13 statements), `check-spec-status` (0 findings, Status `Shipped` matches all-cited coverage), `spec:names` (394/394 citations name the test they point at)
- `.lore/dod.md` — claim quoted verbatim, strategy, the 10-test gate, implementation facets, out-of-scope list

The tests mirror the repo's constraints: one `expect()` per `it` (`re-lint/max-expects` is error at default 1), fixed timestamps, no mocks.

## Red bar (run: exactly these two files)

`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts src/orchestration/chatOrchestrator.acceptance.test.ts`

**Tests: 7 failed, 3 passed, 10 total** — every failure is the ticket's stated reason (no validation exists):

```
● ToolRegistry input validation › rejects input missing a required property, names it, and never calls the executor
  - Expected  - 2
  + Received  + 2
    Object {
  -   "executorCalls": 0,
  -   "namesLocationAsRequired": true,
  +   "executorCalls": 1,
  +   "namesLocationAsRequired": false,
    }
● ... › throws at register time for a schema that cannot compile, naming the tool
  -   "namesTool": true,  -   "threw": true,
  +   "namesTool": false, +   "threw": false,
● ChatOrchestrator tool loop with input validation › returns a rejected tool call to the provider and resolves through the corrected retry
  -   "executorCalls": 1,
  -   "rejectionVisibleOnNextRound": true,
  +   "executorCalls": 2,
  +   "rejectionVisibleOnNextRound": false,
```

Today the registry executes the malformed call (count 1), answers with the executor's string, and `register` accepts `type: 'strng'` silently. The 3 passing tests are guards the ticket itself orders pinned, green by design and documented as such in the dod: passthrough-with-`toEqual` (validation must not start mangling valid input), compile-once (its observable — mutating the registered schema into an uncompilable one after `register` — only bites once something compiles), and `Unknown tool` (deliberately unchanged).

## Facets left for the implementation round

Add the validator to `dependencies`, compile-at-register with per-call resolution for function sources, the one-line doc comment on `execute`, mirror the loop test into `chatOrchestrator.test.ts` and write `registry.test.ts`, update `docs/adding-a-tool.md` / `README.md` / `.specify/spec.md` / `CHANGELOG.md`, MINOR bump + migration note in the PR body. Lint and typecheck are CI's to show here, per the pod's standing memory of the OOM history.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}