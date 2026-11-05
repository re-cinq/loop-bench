I committed and pushed two acceptance tests for #93 in `src/orchestration/usageAcrossRounds.acceptance.test.ts`, and both fail today. I picked the `direct` strategy, because `createChatOrchestrator` with a scripted provider and a registered tool already lets a test observe the hook's `usage` argument.

I ran only that file. Both tests fail because the hook gets the last round's usage instead of the total:

```
reports the sum of every provider call in a turn with two tool rounds
  -   "inputTokens": 4200,   +   "inputTokens": 1700,
  -   "outputTokens": 450,   +   "outputTokens": 400,
  -   "totalTokens": 4650,   +   "totalTokens": 2100,

counts the rounds that reported usage, and reports nothing when none did
  partial: expected 2700 / 420 / 3120, received 1700 / 400 / 2100
```

- **Two tool rounds:** three scripted rounds report different known counts, and the hook should get their sum.
- **Missing usage:** a round that reports no usage should not make the total `undefined` or `NaN`, and a turn where no round reports should still give `undefined`.

`.lore/dod.md` quotes the ticket's claim and records the strategy, tests, facets and scope.

- **Shape chosen:** the tests assume the "sum, one `usage` argument" shape. If the implementer picks the sum-plus-breakdown shape instead, the total still has to arrive as the third argument.
- **Not tested:** the unedited no-tool test, the type signature, the spec/CHANGELOG wording and the lint/build criteria. I listed the spec and CHANGELOG edits as facets in `.lore/dod.md`.
- **Spec link:** I added no `validated by` link. The only relevant spec statement is the under-counting line that the implementation will replace.

The branch is not ahead of its upstream, and merging `origin/main` brought nothing in.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}