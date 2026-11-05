I added three acceptance tests for the ticket in `src/orchestration/turnUsage.acceptance.test.ts`. Two fail today and one passes today. The branch is committed and pushed, `origin/main` was already merged, and `git status` shows it is not ahead of its upstream.

Strategy is `direct`: `createChatOrchestrator` with a scripted provider and an `afterModelResponse` hook is a real seam already. The ticket's claim, quoted at the top of `.lore/dod.md`, is that the hook gets "the usage of the final provider call alone".

Command run: `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/turnUsage.acceptance.test.ts`

Result: `Tests: 2 failed, 1 passed, 3 total`.

- **Sums every provider call across two tool rounds (fails).** Rounds report 100/10, 200/20 and 300/30. The test expects 600/60/660 but the hook receives only the last round:
  ```
  - "inputTokens": 600,  + "inputTokens": 300,
  - "outputTokens": 60,  + "outputTokens": 30,
  - "totalTokens": 660,  + "totalTokens": 330,
  ```
- **Still counts the rounds that reported when one reports none (fails).** The middle round has no usage. The test expects 400/40/440 but gets 300/30/330, the last round again.
- **Reports nothing when no round reported usage (passes).** It stays `undefined`, and it guards the fix against returning zeros or `NaN`. It is not red today because the current code already behaves this way.

The tests accept either shape the ticket allows: a summed `UsageMetadata` as the third argument, or an object whose `total` field holds the sum.

The no-tool-call criterion is covered by the existing, unedited tests in `chatOrchestrator.test.ts` and `toolBudget.test.ts`, so I wrote no new test for it.

I left `specs/hal-engine-config-hooks/spec.md` untouched. Its line 28 still records the under-counting, and rewriting it before the behaviour exists would make it false. The round that fixes this should replace that line and link it to these tests. That is listed as a facet in `.lore/dod.md`.

I did not test two ticket criteria: the hook's type being unambiguous, and the CHANGELOG entry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}