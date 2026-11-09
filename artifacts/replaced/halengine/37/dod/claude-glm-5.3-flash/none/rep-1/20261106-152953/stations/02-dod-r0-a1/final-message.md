The ticket's acceptance work was already committed on this branch (`17e733d`); I verified it end-to-end rather than assuming it, found one gap — `.lore/dod.md` wasn't prettier-clean — fixed and re-pushed.

**State of the branch `loop-bench/37`:**

- **Test file:** `src/orchestration/tools/registry.acceptance.test.ts` (new, own file) — 9 tests against the real seams: `ToolRegistry.register`/`execute` and a `createChatOrchestrator.processMessage` tool loop with a scripted provider. No production code written; `registry.ts` is untouched.
- **Spec:** `specs/hal-engine-tool-input-validation/spec.md` states the contract; every statement carries the repo's `([validated by: …](…#Lnn))` parenthetical, and I re-verified all nine `#Lnn` anchors against the actual `it(` lines (no `scripts/spec-links/reanchor.mjs` in this repo — the anchor scripts are `scripts/repoint-spec-anchors.mjs` et al., and the links are correct).
- **Run (this pod, only that file):**

```
node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts
```

```
● ToolRegistry input validation › rejects input the schema refuses before the executor runs
    - Expected  - 2
    + Received  + 2
      Object {
    -   "executorCalls": 0,
    -   "rejected": true,
    +   "executorCalls": 1,
    +   "rejected": false,
```

```
● ToolRegistry input validation › returns a schema rejection to the model and completes the message on the corrected retry
    - Expected  - 2
    + Received  + 2
      Object {
    -   "executorCalls": 1,
    -   "fedBack": true,
    +   "executorCalls": 2,
    +   "fedBack": false,
        "text": "It is 18 degrees and clear in Berlin.",
```

```
● ToolRegistry input validation › refuses an uncompilable schema at register time, naming the tool
    Object {
    -   "namesTool": true,
    -   "threw": true,
    +   "namesTool": false,
    +   "threw": false,
```

```
Test Suites: 1 failed, 1 total
Tests:       6 failed, 3 passed, 9 total
```

Every red fails for the ticket's stated reason: the executor runs on input the schema refuses, no rejection `ToolResponse` is produced, and nothing throws at register. The 3 greens are the pins the dod names as green by design (passthrough with `toEqual`, compile-once across ten calls, `Unknown tool: get_weather`).

- **Delivery:** branch merged with base (0 commits behind `origin/main`), pushed, and `git status` reports `## loop-bench/37...origin/loop-bench/37` — not ahead of upstream. No PR opened, per instructions.

**Finding for the implementation round** (not a test subject): `registry.ts:82` logs `inputKeys` only, so values are absent from today's logs — the leak assertion in the red-bar test guards the *rejection message* side; keep it that way when wiring ajv's error texts, which carry instance data by default.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}