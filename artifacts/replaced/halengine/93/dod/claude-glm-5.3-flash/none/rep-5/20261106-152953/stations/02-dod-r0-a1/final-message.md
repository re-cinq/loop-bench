## Summary

**Triage: `direct`** — the seam already exists: `createChatOrchestrator().processMessage()` driven with a scripted `AIProvider` and a real `ToolRegistry` runs a genuine multi-round tool turn today, and the hook's usage argument is directly observable.

The branch already carried the DoD commit (`2b8b284`); I verified it end-to-end rather than rewriting it, fixed one formatting drift in `.lore/dod.md`, and pushed.

**The deliverable** — `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`, three tests through the real orchestrator entry point, with a scripted provider whose rounds report known, different token counts (120/15/135 → 340/45/385 → 60/9/69):

1. **Two tool rounds** — expects the field-wise sums 520/69/589. **RED**: receives 60/9/69, the final provider call alone — the ticket's claim verbatim.
2. **A round reports no usage** — expects the two reporting rounds summed to 180/24/204. **RED** for the same under-count (60/9/69).
3. **Nothing reported** — expects `undefined`, not zeros. Green guard, written so an accumulator can't quietly turn nothing into `{0,0,0}` on its way to making tests 1–2 pass.

**Actual failure output:**

```
FAIL src/orchestration/chatOrchestrator.usage.acceptance.test.ts
  ● ... › reports usage covering every provider call in a turn driven through two tool rounds
    - Expected  - 3
    + Received  + 3
      Object {
    -   "inputTokens": 520,
    -   "outputTokens": 69,
    -   "totalTokens": 589,
    +   "inputTokens": 60,
    +   "outputTokens": 9,
    +   "totalTokens": 69,
      }
  ● ... › still counts the rounds that reported when a round reports no usage
    - "inputTokens": 180, "outputTokens": 24, "totalTokens": 204
    + "inputTokens": 60,  "outputTokens": 9,  "totalTokens": 69
Tests: 2 failed, 1 passed, 3 total
```

**Also verified:** criterion 2's pin — `chatOrchestrator.test.ts` "receives collected response text and usage" (line 236) — is unedited (`git diff` empty) and passes, as do the two other guard tests the dod names; `npm run spec:names` reports all 591 spec citations name real tests, including the three new `([validated by ...])` links (no `reanchor.mjs` in this repo, so I re-verified the #Lnn anchors by hand against the test file); prettier is clean on all three changed files; `origin/main` is already an ancestor of HEAD.

**Facets left for the implementation round** (in `.lore/dod.md`): turn on the accumulation at `chatOrchestrator.ts:148`, make the type say the answer, record the rejected shape in the issue, and write the CHANGELOG entry — CI's "Changelog entry" step blocks any PR touching non-test `src/` files without it.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}