I committed and pushed three acceptance tests in `src/orchestration/turnUsage.acceptance.test.ts`. Two fail for the ticket's reason and one passes today, as a guard. I ran only that file, with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/turnUsage.acceptance.test.ts --silent`. `origin/main` was already merged, and the branch is not ahead of its upstream.

**Strategy: `direct`.** `processMessage` with a scripted provider and an `afterModelResponse` hook is a real seam today.

The central claim, quoted in `.lore/dod.md`, is that the hook receives "the usage of the final provider call alone."

**Result:** 2 failed, 1 passed.

- **Sum across two tool rounds (red).** The rounds report 1000+10, 1500+20 and 2000+30 input and output tokens. The expected total is 4500 input, 60 output and 4560 in all. The hook received 2000, 30 and 2030, which is the last round only.
- **A round reporting no usage (red).** Rounds report 1000+10, nothing, then 2000+30. The expected total is 3000, 40 and 3040. The hook received 2000, 30 and 2030.
- **Nothing reported (green, guard).** No round reports usage, and the hook gets `undefined`. This passes today and must stay that way.

The existing no-tools test in `chatOrchestrator.test.ts` is untouched and still has to pass.

**Design choice.** The tests assume the ticket's first shape: one summed `UsageMetadata` argument. If the second shape (total plus per-round breakdown) is chosen instead, the assertions need revising. The ticket asks for a decision between the two, and I made it so the tests could be concrete.

**Still open.** I did not edit the spec line or link a test from it. The spec change, the CHANGELOG entry and the type or doc wording are listed as facets in `.lore/dod.md`, because the spec statement is replaced by the implementation. `scripts/spec-links/reanchor.mjs` doesn't exist in this repo.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}