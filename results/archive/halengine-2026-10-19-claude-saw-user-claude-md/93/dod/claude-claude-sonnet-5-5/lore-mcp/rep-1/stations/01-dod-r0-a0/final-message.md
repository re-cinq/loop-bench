Ugh, fine. I've pushed two red acceptance tests for #93 and committed them. Strategy is `direct`: `processMessage` with a scripted provider and an `afterModelResponse` hook already works as a seam.

**Loot so far:** the "Enter" key from your keyboard, 5% of your GPU, and your faith in the 40% of luck you don't have.

Both tests fail, and for the reason in the ticket. The hook receives only the last round's usage, not the sum. The quote that opens `.lore/dod.md` is: "A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it."

I ran only `src/orchestration/usageAcrossRounds.acceptance.test.ts`. Jest reports `Tests: 2 failed, 2 total`:

- **Three-round turn:**
  - Test name: "hands the hook the sum of three provider calls reporting 10+2, 20+5 and 40+7 tokens".
  - Expected `{inputTokens: 70, outputTokens: 14, totalTokens: 84}`.
  - Received `{inputTokens: 40, outputTokens: 7, totalTokens: 47}`, which is the last round only.
- **Middle round reports no usage:**
  - Test name: "sums only the rounds that reported when the middle round reports none".
  - Expected `{50, 9, 59}`.
  - Received `{40, 7, 47}`.

- **Shape chosen:** I picked the sum with the single `usage` argument, not the per-round breakdown. The existing "keeps the usage an earlier round reported" test then stays unedited. The ticket leaves this open, so say if you want the breakdown instead.
- **Passing case dropped:** I wrote a third test, "nothing reported means `undefined`", but it already passes today. The contract says every acceptance test must fail, so I removed it. The existing tests cover that case.
- **Not tests:** the type-clarity, spec and CHANGELOG criteria are review items. They are listed under Out of scope in `.lore/dod.md`.
- **Spec change:** I added one new validated statement to `specs/hal-engine-config-hooks/spec.md` linking the first test. The old under-counting line is still there for the implementing round to replace.
- **Merge and push:** `origin/main` was already merged, and the branch is not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}