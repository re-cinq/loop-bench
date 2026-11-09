**Strategy: `direct`.** The DoD for re-cinq/HALEngine#93 is committed and pushed as `0f8cad0` on `loop-bench/93`: a new `src/orchestration/chatOrchestrator.acceptance.test.ts` beside the orchestrator, `.lore/dod.md`, and the spec's recorded under-counting line replaced by four statements citing the tests. Production code is untouched — `chatOrchestrator.ts` still carries `lastUsage = outcome.usage ?? lastUsage` — so the red bar below is live.

**What the tests pin** (driven through the real entry point `createChatOrchestrator`, with a scripted in-memory `AIProvider` — the ticket's own named fixture, and the repo's existing tool-loop idiom):

| Test | Today |
|---|---|
| sum of every provider call over two tool rounds (110/440/990 → 1400/140/1540) | **RED** — hook receives 990 |
| silent round skipped, not undefining (110 + silent + 440 → 550) | **RED** — hook receives 440 |
| no-tool turn reports its single call unchanged | green by construction — the ticket pins this as already true |
| nothing reported reports nothing | green by construction — the ticket pins this as already true |

**Actual failure output** — run via the repo's own invocation, `NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`:

```
● afterModelResponse usage › reports the sum of every provider call in a turn driven through two tool rounds
    - Expected  - 3
    + Received  + 3
      Object {
    -   "inputTokens": 1400,
    -   "outputTokens": 140,
    -   "totalTokens": 1540,
    +   "inputTokens": 900,
    +   "outputTokens": 90,
    +   "totalTokens": 990,
      }
    at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:83:22)

● afterModelResponse usage › still totals the rounds that reported when a round reports no usage
    - Expected  - 3        + Received  + 3
      Object {
    -   "inputTokens": 500,  "outputTokens": 50,  "totalTokens": 550,
    +   "inputTokens": 400,  "outputTokens": 40,  "totalTokens": 440,
      }
    at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:97:22)

Tests:       2 failed, 2 passed, 4 total
```

Both failures are precisely the ticket's central claim — *the hook receives the usage of the final provider call alone* — not an import or fixture error.

**Also verified:** prettier passes on the test file; `node scripts/check-spec-links.mjs` reports `misplaced: 0 across 0 specs (1641 statements scanned)`, so the four `#Lnn` anchors (L68/L86/L100/L108) are correct; the spec's `| Status | Shipped |` row is unedited; the two existing tests the ticket names (`receives collected response text and usage`, `keeps the usage an earlier round reported when a later round reports none`) are unedited — empty diff; `.lore/dod.md` records the shape decision (accumulate into one `usage` argument, reject the per-round breakdown, with the signature-must-say-sum facet) and parks the CHANGELOG entry, `OrchestratorHooks` doc-block regen, and the rest of criterion 6 as facets for the implementing round / CI's `Verify` job. Branch is pushed and `HEAD..origin/main` is empty — no merge drift.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}