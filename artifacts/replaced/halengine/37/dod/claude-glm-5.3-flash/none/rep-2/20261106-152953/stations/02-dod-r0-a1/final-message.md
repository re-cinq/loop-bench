Pushed and confirmed: `git status` reports the branch is up to date with `origin/loop-bench/37`, working tree clean. `origin/main` (8c3318e) is an ancestor of HEAD, so the branch merges cleanly and CI will run.

## What happened this round

The DoD for #37 was already committed on this branch by the prior pod run (`2db26b6`) — red acceptance tests, the spec, and `.lore/dod.md` — but two comment runs in the test file would have failed CI's `re-lint/max-comment-lines` (max 1 line, applies to `**/*.ts`; this file held the only multi-line comment run in any test file in the repo). I verified the whole deliverable and fixed that:

1. **Verified the red bar** — ran the acceptance file: 8 failed, 2 passed (the 2 pins of unchanged behaviour). Each failure is for the ticket's stated reason: the executor runs on schema-invalid input, no rejection text is produced, and the throw escapes `processMessage`.
2. **Compressed the two comment runs to one line each** in `src/orchestration/tools/registry-input-validation.acceptance.test.ts` (test-file edits only — no production code), ran `npx prettier --write` (already clean).
3. **Re-anchored all 10 `([validated by ...])` links** in `specs/hal-engine-tool-input-validation/spec.md` to the shifted line anchors by hand (this repo has no `scripts/spec-links/reanchor.mjs`), and confirmed the header-table convention: all 9 statements cited, so `Status: Shipped` is what `re-lint/require-status-matches-coverage` requires — left untouched.
4. **Committed and pushed** (`ff482cc`); branch not ahead of upstream.

**Triage: `direct`** — the seam already exists (`ToolRegistry.register`/`execute`, and `createChatOrchestrator` with a scripted provider); every test calls the real code and fails only because validation is absent.

**Command run** (the file the pod's Bash hook permits, also in `.lore/dod.md`):
`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/tools/registry-input-validation.acceptance.test.ts`

**Actual failure output** (excerpts from the run after my edit):

```
● ToolRegistry input validation › rejects input missing a required property before the executor runs
    - Expected  - 3
    + Received  + 3
      Object {
    -   "calls": 0,
    -   "namesConstraint": true,
    -   "namesProperty": true,
    +   "calls": 1,
    +   "namesConstraint": false,
    +   "namesProperty": false,
      }

● ToolRegistry input validation › throws at register time for an uncompilable schema, naming the tool
    Expected pattern: /get_weather/
    Received function did not throw

● ToolRegistry input validation › returns a rejected tool call to the model as a tool result within the same conversation
    invalid input reached the executor
      at ToolRegistry.execute (src/orchestration/tools/registry.ts:83:34)
      at Object.processMessageStream (src/orchestration/chatOrchestrator.ts:104:58)

Tests:       8 failed, 2 passed, 10 total
```

**Finding for the implementation round** (from the dod's facet list, not new): the ticket's CI gate also demands `ajv` in `dependencies`, the one-line doc comment on `execute` pointing at the spec, the docs/CHANGELOG/version edits, and `npm run build && node --input-type=module -e "import('./dist/index.js')"` exiting 0 — none of that exists yet, and none of it is testable here without production code.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}