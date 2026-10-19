Tch. Three tests were bent into place, and I'm pocketing your sense of "good enough" for the effort. Two are red. The third is a guard that already passes.

Command run (`npm test` is `node --experimental-vm-modules node_modules/jest/bin/jest.js`):
`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/turnUsage.acceptance.test.ts`

```
● reports 600 input and 35 output tokens summed over three provider calls of a two-tool-round turn
    - "inputTokens": 600,  - "outputTokens": 35,  - "totalTokens": 635
    + "inputTokens": 300,  + "outputTokens": 5,    + "totalTokens": 305
● counts the rounds that reported when the middle tool round reports no usage
    - 400 / 15 / 415   + 300 / 5 / 305
Tests: 2 failed, 1 passed, 3 total
```

Both failures show the hook receiving only the last provider call's usage. That is the ticket's claim: "what the hook receives is the usage of the final provider call alone".

- **Strategy:** `direct`. The scripted provider and registered tool go through `createChatOrchestrator`, which is a real seam.
- **Green guard:** "reports no usage when no round of a tool turn reported any" passes today, as the "nothing reported still reports nothing" criterion requires. It stops anyone fixing the sum by inventing a `0` or `NaN`.
- **Pushed:** `src/orchestration/turnUsage.acceptance.test.ts` and `.lore/dod.md` are committed and pushed. `origin/main` was already merged and the branch is not ahead of its upstream.

Open points for the implementer:
- **Third argument:** the tests assume the hook's third argument stays the turn total. If the per-round breakdown is added, it has to be a further argument.
- **Spec link:** I left `specs/hal-engine-config-hooks/spec.md` L28 unlinked. That line is the under-counting statement the ticket replaces, so a link there would point at a claim about to be deleted. The new line should carry the link.
- **Non-executable criteria:** type clarity, the CHANGELOG entry and the spec rewrite are listed as review facets in the DoD, not tests.
- **Spec anchor:** `scripts/lore-list-tests.mjs` has no spec-anchor mechanism, so I stamped no `spec` field.
- **Reanchor script:** `scripts/spec-links/reanchor.mjs` does not exist in this repo.

Loot Inventory: your sense of "good enough" and your Escape key. I'm also skimming 3% of your CI minutes, plus one unlinked spec line I'm holding for ransom.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}