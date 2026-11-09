## Result

This branch already carried a DoD round's deliverable (`197ec96`: acceptance tests + spec rewrite + `.lore/dod.md`), with the production code still on the keep-last `lastUsage` at `src/orchestration/chatOrchestrator.ts:117`. I verified that deliverable against the ticket rather than rewriting it, tidied the one thing it left unformatted, and pushed.

**Strategy: `direct`** — the seam exists: `createChatOrchestrator(...).processMessage(...)` drives a scripted provider through real tool rounds, and the hook's third argument is observable. Recorded in `.lore/dod.md`, quoting the ticket verbatim: *"A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it."*

**The contract pinned** (`src/orchestration/turnUsage.acceptance.test.ts`, three tests): per-field sum across every reporting round plus a `rounds` breakdown in call order; a silent round neither poisons the total nor erases the reporting ones; no reporting at all delivers `undefined`. The `rounds`-only-when-multiple threshold is what keeps the no-tool path byte-identical, pinned by the unedited `receives collected response text and usage` (flat `toEqual`, `chatOrchestrator.test.ts:253`) and `keeps the usage an earlier round reported…` (`:547`) — both stay green under this design. The folded shape (sum + breakdown) and its rationale are recorded in `specs/hal-engine-config-hooks/spec.md` § Usage reported to afterModelResponse, and the repo's own verifiers pass: `check-spec-links` 0 misplaced across 1644 statements, `check-spec-anchor-names` 592 citations OK, `check-spec-status` 0 findings.

**Red bars** — `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/turnUsage.acceptance.test.ts` → `Tests: 2 failed, 1 passed, 3 total`, failing on exactly the ticket's claim (last provider call alone, not the turn):

```
● afterModelResponse turn usage › reports a turn total across two tool rounds, not only the last round
    expect(received).toEqual(expected) // deep equality
    - Expected  - 12
    + Received  +  0
      "seen": Object {
    -     "inputTokens": 310,
    -     "outputTokens": 58,
    -     "rounds": Array [ … ]
          "inputTokens": 100,
          "outputTokens": 40,
          "totalTokens": 140,
    -     …
          "totalTokens": 368,
        },
      }
      at Object.<anonymous> (src/orchestration/turnUsage.acceptance.test.ts:83:21)
```

(the hook received `228/18/210` — round two alone). The third test is green by design and the dod says so: it pins the floor a wrong implementation (zero-initialised accumulator, sum over `undefined`) breaks, per the ticket's own criterion that a nothing-reported turn still reports nothing.

**This round's change:** `dddb9d6` — prettier-formatted the path indents in `.lore/dod.md` (the only file CI's `prettier:check` scope would eventually want tidy; the `.ts` test file was already clean). Pushed; `git status` reports the branch even with `origin/loop-bench/93`, and `origin/main` (`867ad52`) is an ancestor of HEAD, so no merge drift. No PR opened.

**Facets still owed by the implementer** (listed in `.lore/dod.md`): accumulate per-field in `chatOrchestrator.ts`, give the third parameter a turn-level exported type in `src/types/ai.ts` (`TurnUsage extends UsageMetadata` with `rounds?`, no `any`), add the CHANGELOG `Changed` line for the MINOR bump, re-run `scripts/repoint-spec-anchors.mjs` after touching the orchestrator, and keep CI's Verify green.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}